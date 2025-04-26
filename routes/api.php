<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PlaceholderUserController;
use App\Models\PlaceholderUser;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('/users', [PlaceholderUserController::class, 'index']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/users', function(){
    return PlaceholderUser::get();
});

Route::get('/users/{id}', function ($id) {
    return PlaceholderUser::find($id);
});

Route::post('/users/{id}', function ($id, Request $request) {
   $request ->validate([
        'name' => 'required|min:4|max:60',
        'email' => 'required|email|unique:users,email,'.$id,
        'password' => 'nullable|min:4|max:20|confirmed',
    ]);
});