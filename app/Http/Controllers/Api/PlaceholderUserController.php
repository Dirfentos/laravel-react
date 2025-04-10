<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PlaceholderUser;

class PlaceholderUserController extends Controller
{
    public function index()
    {
        return response()->json(PlaceholderUser::all());
    }
}
