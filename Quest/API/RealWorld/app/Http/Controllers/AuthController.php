<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\User;
use App\Http\Requests\User\RegisterRequest;
use App\Http\Requests\User\LoginRequest;
use App\Http\Requests\User\UpdateRequest;
use App\Http\Resources\User\UserResource;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $validated = $request->validated();
        $validated["password"] = Hash::make($validated["password"]);

        $user = User::create($validated);
        $token = JWTAuth::fromUser($user);

        return new UserResource($user, $token);
    }

    public function login(LoginRequest $request)
    {
        $validated = $request->validated();

        if (!$token = auth()->attempt($validated)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return new UserResource(auth()->user(), $token);
    }

    public function currentUser()
    {
        $token = auth()->refresh();

        return new UserResource(auth()->user(), $token);
    }

    public function update(UpdateRequest $request)
    {
        auth()->user()->update(['email' => $request->email]);
        $token = auth()->refresh();

        return new UserResource(auth()->user(), $token);
    }

    public function logout()
    {
        auth()->logout();

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }
}
