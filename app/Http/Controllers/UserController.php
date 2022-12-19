<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function profile(): JsonResponse
    {
        $user = auth()->user();
        return response()->json($user);
    }

    public function update(Request $request): JsonResponse
    {
        $user_id = auth()->user()->getAuthIdentifier();

        $fields = $request->all();

        $successMessage = 'Successfully updated';

        if (isset($fields['new_first_name'])){
            $inputEmail = $request->validate(['new_first_name' => ['string','min:2','max:45']]);
            try {
                User::where('id',$user_id)
                    ->update(['first_name' => $inputEmail['new_first_name']]);
            }catch (QueryException $exception){
                return response()->json([
                    'message' => 'Invalid Request!',
                    'error' => $exception->getMessage()
                ],401);
            }
            $successMessage = $successMessage. ' first name';
        }

        if (isset($fields['new_last_name'])){
            $inputEmail = $request->validate(['new_last_name' => ['string','min:2','max:45']]);
            try {
                User::where('id',$user_id)
                    ->update(['last_name' => $inputEmail['new_last_name']]);
            }catch (QueryException $exception){
                return response()->json([
                    'message' => 'Invalid Request!',
                    'error' => $exception->getMessage()
                ],401);
            }
            $successMessage = $successMessage. ' last name';
        }

        if (isset($fields['new_email'])){
            $inputEmail = $request->validate(['new_email' => ['unique:users,email','email']]);
            try {
                 User::where('id',$user_id)
                    ->update(['email' => $inputEmail['new_email']]);
            }catch (QueryException $exception){
                return response()->json([
                    'message' => 'Invalid Request!',
                    'error' => $exception->getMessage()
                ],401);
            }
            $successMessage = $successMessage. ' email';
        }

        if (isset($fields['new_password'])){
            $inputPassword = $request->validate(['new_password' => ['min:8','max:75','string','confirmed']]);

            try {
                User::where('id',$user_id)
                    ->update(['password' => bcrypt($inputPassword['new_password'])]);
            }catch (QueryException $exception){
                return response()->json([
                    'message' => 'Invalid Request!',
                    'error' => $exception->getMessage()
                ],401);
            }

            $successMessage = $successMessage. ' password';
        }

        if ($successMessage === 'Successfully updated'){$successMessage = 'Nothing Updated';}

        $successMessage = $successMessage. '!';

        $user = User::where('id',$user_id)->first();

        return response()->json([
            'message' => $successMessage,
            'user' => $user
        ]);

    }

    public function destroy(): JsonResponse
    {
        $user_id = auth()->user()->getAuthIdentifier();

        try {
            User::where('id',$user_id)
                ->delete();
        }catch (QueryException $exception){
            return response()->json([
                'message' => 'Invalid Request!',
                'error' => $exception->getMessage()
            ],401);
        }

        return response()->json(['message' => 'Successfully Deleted Account!']);
    }
}
