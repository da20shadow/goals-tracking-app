<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Target extends Model
{
    use HasFactory;
    protected  $fillable = [
        'title',
        'description',
        'goal_id',
        'user_id'
    ];
}
