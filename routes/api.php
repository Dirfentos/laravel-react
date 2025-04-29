<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PlaceholderUserController;
use App\Models\PlaceholderUser;
use Illuminate\Validation\ValidationException;


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
    try {
        $validated = $request->validate([
            'name' => 'required|min:4|max:60',
            'email' => 'required|email|unique:placeholder_users,email,'.$id,
            'password' => 'nullable|min:4|max:20|confirmed',
        ]);
    } catch (ValidationException $ex) {
        return response()->json([
            'status' => 'error',
            'errors' => $ex->errors()
        ], 422);
    }

    $user = PlaceholderUser::find($id);

    if (!$user) {
        return response()->json(['status' => 'error', 'message' => 'Felhasználó nem található'], 404);
    }

    if (isset($validated['password']) && $validated['password']) {
        $validated['password'] = bcrypt($validated['password']);
    } else {
        unset($validated['password']); 
    }

    $user->update($validated);

    return response()->json(['status' => 'success', 'message' => 'Sikeres módosítás!']);
});

Route::delete('/users/{id}', function ($id) {
    $user = PlaceholderUser::find($id);

    if (!$user) {
        return response()->json(['status' => 'error', 'message' => 'Felhasználó nem található'], 404);
    }

    $user->delete();

    return response()->json(['status' => 'success', 'message' => 'Felhasználó sikeresen törölve!']);
});
