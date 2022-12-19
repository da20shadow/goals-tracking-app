<?php

namespace App\Http\Controllers;

use App\Models\Target;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TargetController extends Controller
{

    public function store(Request $request): JsonResponse
    {
        $fields = $request->validate([
            'title' => ['required','string'],
            'description' => ['required','string'],
            'goal_id' => ['required','number'],
        ]);

        $user_id = auth()->user()->getAuthIdentifier();

        try {
            $targetExist = Target::where('user_id',$user_id)
                ->where('goal_id',$fields['goal_id'])
                ->where('title',$fields['title'])
                ->first();
        }catch (QueryException $exception){
            return response()->json([
                'message' => 'An Error Occur! Please, try again!',
                'error' => $exception->getMessage()
            ],400);
        }

        if ($targetExist !== null) {
            return response()->json(['message' => 'Goal with the same title already added!'],400);
        }

        try {
            $fields['user_id'] = $user_id;
            $target = Target::create($fields);
        }catch (QueryException $exception){
            return response()->json([
                'message' => 'An Error Occur! Please, try again!',
                'error' => $exception->getMessage()
            ],400);
        }

        //TODO: if no goal uncomment and remove $target = Target::create
//        $addedTarget = Target::where('user_id',$user_id)
//            ->where('title',$fields['title'])->first();

        return response()->json([
            "message" => "Successfully added new target!",
            "target" => $target
//            "target" => $addedTarget
        ],201);
    }

    public function show($id): JsonResponse
    {
        $result = self::calculateTargetProgress($id);

        if ($result['target'] === null){
            return response()->json([
                'message' => 'Error! Cannot get Target By ID!',
                'error' => $result['error']
            ], 400);
        }
        $target = $result['target'];

        return response()->json($target);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $user_id = auth()->user()->getAuthIdentifier();

        $result = self::chekIfExist($user_id, $id);

        if ($result['error'] === true){
            return response()->json(['message' => $result['message']], 400);
        }

        $fields = $request->all();

        if (isset($fields['title'])){
            $inputTitle = $request->validate(['title' => ['string','min:10','max:455']]);
            try {
                Target::where('user_id',$user_id)
                    ->where('id',$id)
                    ->update(['title' => $inputTitle['title']]);
            }catch (QueryException $exception){
                return response()->json([
                    'message' => 'An Error Occur! Please, try again!',
                    'error' => $exception->getMessage(),
                ],400);
            }
        }

        if (isset($fields['description'])){
            $inputDesc = $request->validate(['description' => ['string']]);
            try {
                Target::where('user_id',$user_id)->where('id',$id)
                    ->update(['description' => $inputDesc['description']]);
            }catch (QueryException $exception){
                return response()->json([
                    'message' => 'An Error Occur! Please, try again!',
                    'error' => $exception->getMessage(),
                ],400);
            }
        }

        $updatedTarget = Target::where('user_id',$user_id)
        ->where('id',$id)->first();

        return response()->json([
            "message" => "Successfully updated goal!",
            "goal" => $updatedTarget
        ]);
    }

    public function destroy($id): JsonResponse
    {
        $user_id = auth()->user()->getAuthIdentifier();

        $result = self::chekIfExist($user_id, $id);
        if ($result['error'] === true){
            return response()->json(['message' => $result['message']], 400);
        }

        try {
            $result = DB::table('targets')
                ->where('id',$id)
                ->where('user_id',$user_id)
                ->delete();
        }catch (QueryException $exception){
            return response()->json([
                'message' => 'An Error Occur! Please, try again!',
                'error' => $exception->getMessage()
            ]);
        }

        if (!$result){
            return response()->json([
                'message' => 'Error! Such target not exist!'
            ],400);
        }
        return response()->json([
            'target_id' => $id,
            'message' => 'Successfully deleted target!'
        ]);
    }

    private static function calculateTargetProgress($targetId): ?array
    {
        $result = [];
        try {
            $target = DB::table('targets')
                ->select(DB::raw("targets.id,targets.title,targets.description,
            count(tasks.id) as total_tasks
            sum(case when tasks.status = 'Completed' then 1 else 0 end) as total_completed_tasks"))
                ->leftJoin('tasks','targets.id','tasks.target_id')
                ->where('target.id','=',$targetId)
                ->get();
        }catch (QueryException $exception){
            $result['error'] = $exception->getMessage();
            return $result['target'] = null;
        }

        $progress = 0;

        if ($target['total_tasks'] > 0){
            $progress = ($target['total_completed_tasks'] / $target['total_tasks']) * 100;
        }
        $target['progress'] = $progress;

        $result['target'] = $target;

        return $result;
    }

    private static function chekIfExist(mixed $user_id, $targetId): array
    {
        $result = ['error' => false, 'message' => ''];
        try {
            $targetExist = DB::table('targets')
                ->where(['id' => $targetId, 'user_id' => $user_id])->first();
        }catch (QueryException $exception){
            $result['error'] = true;
            $result['message'] = $exception->getMessage();
            return $result;
        }

        if (null === $targetExist){
            $result['error'] = true;
            $result['message'] = 'Such goal not exist!';
        }
        $result['target'] = $targetExist;
        return $result;
    }

}
