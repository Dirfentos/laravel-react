<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlaceholderUser extends Model
{
    use HasFactory;

    protected $table = 'placeholder_users';

    protected $fillable = ['id', 'name', 'username', 'email', 'phone', 'website'];

    public $incrementing = false; 

}
