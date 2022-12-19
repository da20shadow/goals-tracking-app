<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GoalController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


/** ------------------------Public------------------------ */
Route::post('login',[AuthController::class,'login']);
Route::post('register',[AuthController::class,'register']);


/** ----------------------Protected----------------------- */
Route::group(['middleware' => ['auth:sanctum']],function () {

    /** ----------USER---------- */
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('profile', [UserController::class, 'profile']);
    Route::patch('profile/update', [UserController::class, 'update']);
    Route::delete('profile/delete', [UserController::class, 'destroy']);

    /** ---------GOALS--------- */
    Route::get('goals', [GoalController::class, 'goals']);
    Route::get('goals/{id}', [GoalController::class, 'show']);
    Route::post('goals/add', [GoalController::class, 'store']);
    Route::patch('goals/update/{id}', [GoalController::class, 'update']);
    Route::delete('goals/delete/{id}', [GoalController::class, 'destroy']);

    /** --------TARGETS-------- */


    /** ---------TASKS--------- */

});
