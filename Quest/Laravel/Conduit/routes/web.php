<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('home');
});

Route::get('/article/{article}', function (string $id) {
    return view('article');
});

Route::get('/create', function () {
    return view('create');
});

Route::get('/edit/{article}', function (string $id) {
    return view('edit');
});