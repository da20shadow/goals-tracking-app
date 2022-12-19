<?php

namespace App\Http\Controllers;

use App\Models\Goal;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GoalController extends Controller
{
    public function goals(): JsonResponse
    {
        $user_id = auth()->user()->getAuthIdentifier();

        try {
            $goalsList = DB::table('goals')
                ->where('goals.user_id', '=', $user_id)
                ->get();

            $goals = [];
            foreach ($goalsList as $goal){
                $goal = self::setTargetInfoForGoal($goal);
                array_push($goals,$goal);
            }

        }catch (QueryException $exception){
            return response()->json([
                'message' => 'An Error Occur! Please, try again!',
                'error' => $exception->getMessage()
            ],400);
            //TODO: log the error!
        }

        if (count($goals) < 1){
            return response()->json(['message' => 'No Goals Yet!'],400);
        }

        //Goal will contain:
        //id, title, description, due_date, totalTargets, progress

        return response()->json($goals);

    }

    public function store(Request $request): JsonResponse
    {
        $fields = $request->validate([
            'title' => ['required','string'],
            'description' => ['required','string'],
            'due_date' => ['required','date'],
            'category' => ['string']
        ]);

        $user_id = auth()->user()->getAuthIdentifier();

        try {
            $goalExist = Goal::where('user_id',$user_id)
                ->where('title',$fields['title'])->first();
        }catch (QueryException $exception){
            return response()->json([
                'message' => 'An Error Occur! Please, try again!',
                'error' => $exception->getMessage()
            ],400);
        }

        if ($goalExist !== null) {
            return response()->json(['message' => 'Goal with the same title already added!'],400);
        }

        try {
            $fields['user_id'] = $user_id;
            $goal = Goal::create($fields);
        }catch (QueryException $exception){
            return response()->json([
                'message' => 'An Error Occur! Please, try again!',
                'error' => $exception->getMessage()
            ],400);
        }

        //TODO: if no goal uncomment and remove $goal = Goal::create
//        $addedGoal = Goal::where('user_id',$user_id)
//            ->where('title',$fields['title'])->first();

        return response()->json([
            "message" => "Successfully added new goal!",
            "goal" => $goal
//            "goal" => $addedGoal
        ],201);
    }

    public function show($id): JsonResponse
    {
        $user_id = auth()->user()->getAuthIdentifier();

        $result = self::chekIfExist($user_id, $id);
        if ($result['error'] === true){
            return response()->json([
                'message' => $result['message']
            ], 400);
        }

        $goal = self::setTargetInfoForGoal($result['goal']);

        if ($goal === null){
            return response()->json(['message' => 'An Error Occur!'],400);
        }

        return response()->json($goal);
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
                Goal::where('user_id',$user_id)->where('id',$id)
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
                Goal::where('user_id',$user_id)->where('id',$id)
                    ->update(['description' => $inputDesc['description']]);
            }catch (QueryException $exception){
                return response()->json([
                    'message' => 'An Error Occur! Please, try again!',
                    'error' => $exception->getMessage(),
                ],400);
            }
        }

        if (isset($fields['category'])){
            $inputCategory = $request->validate(['category' => ['string','min:5','max:45']]);
            try {
                Goal::where('user_id',$user_id)->where('id',$id)
                    ->update(['category' => $inputCategory['category']]);
            }catch (QueryException $exception){
                return response()->json([
                    'message' => 'An Error Occur! Please, try again!',
                    'error' => $exception->getMessage(),
                ],400);
            }
        }

        if (isset($fields['due_date'])){
            $inputDueDate = $request->validate(['due_date' => ['Date']]);
            try {
                Goal::where('user_id',$user_id)->where('id',$id)
                    ->update(['due_date' => $inputDueDate['due_date']]);
            }catch (QueryException $exception){
                return response()->json([
                    'message' => 'An Error Occur! Please, try again!',
                    'error' => $exception->getMessage(),
                ],400);
            }
        }

        $updatedGoal = Goal::where('user_id',$user_id)
            ->where('id',$id)->first();

        return response()->json([
            "message" => "Successfully updated goal!",
            "goal" => $updatedGoal
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
            $result = DB::table('goals')
                ->where('id',$id)
                ->where('user_id',$user_id)
                ->delete();
        }catch (QueryException $exception){
            return response()->json(['message' => 'An Error Occur! Please, try again!']);
            //TODO: log the error!
        }

        if (!$result){
            return response()->json([
                'message' => 'Error! Such goal not exist!'
            ],400);
        }
        return response()->json([
            'goal_id' => $id,
            'message' => 'Successfully deleted goal!'
        ]);
    }

    private static function setTargetInfoForGoal($goal){
        try {
            $targetInfo = DB::table('targets')
                ->leftJoin('tasks','targets.id','=','tasks.target_id')
                ->select(DB::raw("count(targets.id) as total_targets,
                    count(tasks.id) as total_target_tasks,
                    sum(case when tasks.status = 'Completed' then 1 else 0 end) as completed_target_tasks"))
                ->where('targets.id','=',$goal['id'])
                ->groupBy('targets.id')
                ->get();

            $goal['totalTargets'] = $targetInfo['total_targets'];
            $progress = 0;

            if ($targetInfo['total_target_tasks'] > 0){
                $progress = ($targetInfo['completed_target_tasks'] / $targetInfo['total_targets']) * 100;
            }
            $goal['progress'] = $progress;
        }catch (QueryException $exception){
            response()->json(['message' => 'Error! Can Not Set Goal target Info!']);
            return null;
        }
        return $goal;
    }

    private static function chekIfExist(mixed $user_id, int $goal_id): array
    {
        $result = ['error' => false, 'message' => ''];
        try {
            $goalExist = DB::table('goals')
                ->where(['id' => $goal_id, 'user_id' => $user_id])->first();
        }catch (QueryException $exception){
            $result['error'] = true;
            $result['message'] = 'An Error Occur! Please, try again!';
            return $result;
            //TODO: log the error!
        }

        if (null === $goalExist){
            $result['error'] = true;
            $result['message'] = 'Such goal not exist!';
        }
        $result['goal'] = $goalExist;
        return $result;
    }
}
