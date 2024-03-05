<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ArticleController;

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
    // Authentication
    Route::get('/user', [AuthController::class, 'currentUser']);
    Route::put('/user', [AuthController::class, 'update']);
    Route::delete('/users/logout', [AuthController::class, 'logout']);

    // Article
    Route::get('/articles', [ArticleController::class, 'list']);
    Route::get('/articles/{slug}', [ArticleController::class, 'index']);
    Route::post('/articles', [ArticleController::class, 'create']);
    Route::put('/articles/{slug}', [ArticleController::class, 'update']);
    Route::delete('/articles/{slug}', [ArticleController::class, 'delete']);
  });
});
