<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::group([
  'middleware' => 'api',
], function () {
  Route::post('/users', [AuthController::class, 'register']);
  Route::post('/users/login', [AuthController::class, 'login']);

  Route::group([
    'middleware' => 'jwt.auth',
  ], function () {
    Route::get('/user', [AuthController::class, 'currentUser']);
    Route::put('/user', [AuthController::class, 'update']);
    Route::delete('/users/logout', [AuthController::class, 'logout']);
  });
});
