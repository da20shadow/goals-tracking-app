<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GoalController;
use App\Http\Controllers\TargetController;
use App\Http\Controllers\TaskController;
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
    Route::get('goal/targets/{id}', [GoalController::class, 'goalTargets']);
    Route::get('goals/{id}', [GoalController::class, 'show']);
    Route::post('goals/add', [GoalController::class, 'store']);
    Route::patch('goals/update/{id}', [GoalController::class, 'update']);
    Route::delete('goals/delete/{id}', [GoalController::class, 'destroy']);

    /** --------TARGETS-------- */
    Route::get('targets/{id}', [TargetController::class, 'show']);
    Route::get('target/tasks/{id}', [TargetController::class, 'getTargetTasks']);
    Route::post('targets/add', [TargetController::class, 'store']);
    Route::patch('targets/update/{id}', [TargetController::class, 'update']);
    Route::delete('targets/delete/{id}', [TargetController::class, 'destroy']);

    /** ---------TASKS--------- */
    Route::get('tasks',[TaskController::class,'index']);
    Route::get('tasks/{id}',[TaskController::class,'show']);
    Route::post('tasks/add',[TaskController::class,'store']);
    Route::patch('tasks/update/{id}',[TaskController::class,'update']);
    Route::delete('tasks/delete/{id}',[TaskController::class,'destroy']);
});
