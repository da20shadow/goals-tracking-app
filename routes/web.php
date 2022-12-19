<?php

use App\Http\Controllers\AngularController;
use Illuminate\Support\Facades\Route;

Route::any('/{any}', [AngularController::class,'index'])
    ->where('any',"^(?!api).*$");
