<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;


/** ------------------------Public------------------------ */
Route::post('login',[AuthController::class,'login']);
Route::post('register',[AuthController::class,'register']);


/** ----------------------Protected----------------------- */
Route::group(['middleware' => ['auth:sanctum']],function () {

    /** ----------USER---------- */
    Route::post('logout', [AuthController::class, 'logout']);

    /** ---------GOALS--------- */


    /** --------TARGETS-------- */


    /** ---------TASKS--------- */

});
