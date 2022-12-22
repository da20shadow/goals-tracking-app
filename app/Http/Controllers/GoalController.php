<?php

namespace App\Http\Controllers;

use App\Models\Goal;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
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
            return response()->json(['message' => 'No Goals Yet!'],204);
        }

        //Goal will contain:
        //id, title, description, due_date, totalTargets, progress

        return response()->json($goals);

    }

    public function store(Request $request): JsonResponse
    {
        $fields = $request->validate([
            'title' => ['required','string','min:5','max:145'],
            'description' => ['required','string','min:5'],
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
            return response()->json([
                'message' => 'Goal with the same title already added!'
            ],400);
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

        $result = self::chekIfExist($user_id, $goal['id']);
        if ($result['error'] === true){
            return response()->json([
                'message' => $result['message']
            ], 400);
        }

        $goal = self::setTargetInfoForGoal($result['goal']);

        return response()->json([
            "message" => "Successfully added new goal!",
            "goal" => $goal
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

//        $goalTargets =

        return response()->json($goal);
    }

    public function goalTargets($id): JsonResponse
    {
        $user_id = auth()->user()->getAuthIdentifier();
        $result = self::chekIfExist($user_id, $id);
        if ($result['error'] === true){
            return response()->json(['message' => $result['message']], 400);
        }

        try {
            $goalTargets = DB::table('targets')
                ->select(DB::raw("targets.id,targets.title,
            count(tasks.id) as total_tasks,
            sum(case when tasks.status = 'Completed' then 1 else 0 end) as total_completed_tasks"))
                ->leftJoin('tasks','targets.id','tasks.target_id')
                ->where('targets.goal_id','=',$id)
                ->groupBy('targets.id','targets.title')
                ->get();
        }catch (QueryException $exception){
            return response()->json([
                'message' => 'Error! Cannot get goal targets!',
                'error' => $exception->getMessage()
            ], 400);
        }

        //Target contains
        //id, title, total_tasks, total_completed_tasks progress
        $targets = [];
        foreach ($goalTargets as $target){
            $result = self::setTargetProgress($target->id);
            if ($result['target']){
                array_push($targets,$result['target']);
            }
        }
        return response()->json($targets);

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
            $inputTitle = $request->validate(['title' => ['string','min:10','max:145']]);
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

        if (isset($fields['start_date'])){
            $inputDueDate = $request->validate(['start_date' => ['Date']]);
            try {
                Goal::where('user_id',$user_id)->where('id',$id)
                    ->update(['start_date' => $inputDueDate['start_date']]);
            }catch (QueryException $exception){
                return response()->json([
                    'message' => 'An Error Occur! Please, try again!',
                    'error' => $exception->getMessage(),
                ],400);
            }
        }

        $updatedGoal = Goal::where('user_id',$user_id)
            ->where('id',$id)->first();

        $goal = self::setTargetInfoForGoal($updatedGoal);

        return response()->json([
            "message" => "Successfully updated goal!",
            "goal" => $goal
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

            $goalTargets = self::getGoalTargets($goal->id);

            $totalTargets = 0;
            $totalCompletedTargets = 0;

            if ($goalTargets === null){

                $goal->totalTargets = 0;
                $goal->progress = 0;

            }else {
                foreach ($goalTargets as $target) {
                    $totalTargets++;
                    $target_id = $target->id;
                    $isTargetCompleted = self::isTargetCompleted($target_id);
                    if ($isTargetCompleted){
                        $totalCompletedTargets++;
                    }
                }

                $goalProgress = 0;
                if ($totalTargets > 0){
                    $goalProgress = ($totalCompletedTargets / $totalTargets) * 100;
                }

                $goal->totalTargets = $totalTargets;
                $goal->progress = $goalProgress;
            }

        }catch (QueryException $exception){
            response()->json([
                'error' => $exception->getMessage()
            ],400);
            return null;
        }
        return $goal;
    }

    private static function isTargetCompleted($target_id): bool
    {
        $result = self::setTargetProgress($target_id);

        if ($result['target'] === null){
            response()->json([
                'message' => 'Error! Cannot get Target By ID!',
                'error' => $result['error']
            ], 400);
            return false;
        }
        $target = $result['target'];

        return $target->progress >= 100;
    }

    private static function setTargetProgress($targetId): array
    {
        $result = [];
        try {
            $target = DB::table('targets')
                ->select(DB::raw("targets.id,targets.title,targets.description,targets.goal_id,
            count(tasks.id) as total_tasks,
            sum(case when tasks.status = 'Completed' then 1 else 0 end) as total_completed_tasks"))
                ->leftJoin('tasks','targets.id','tasks.target_id')
                ->where('targets.id','=',$targetId)
                ->groupBy('targets.id','targets.title','targets.description','targets.goal_id')
                ->first();
            $result['target'] = $target;
        }catch (QueryException $exception){
            $result['error'] = $exception->getMessage();
            $result['target'] = null;
            return $result;
        }

        if (isset($target) ){
            if ($target->total_tasks > 0){
                $progress = ($target->total_completed_tasks / $target->total_tasks) * 100;
                $target->progress = $progress;
            }else {
                $target->progress = 0;
            }
        }

        $result['target'] = $target;
        if (!$target){
            $result['error'] = 'Such Target Not Exist!';
        }
        return $result;
    }

    private static function chekIfExist(mixed $user_id, int $goal_id): array
    {
        $result = ['error' => false, 'message' => ''];
        try {
            $goalExist = DB::table('goals')
                ->where(['id' => $goal_id, 'user_id' => $user_id])->first();
        }catch (QueryException $exception){
            $result['error'] = true;
            $result['message'] = $exception->getMessage();
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

    private static function getGoalTargets($goal_id): ?Collection
    {
        try {
            $goalTargets = DB::table('targets')
                ->select(DB::raw("targets.id,targets.title,
            count(tasks.id) as total_tasks,
            sum(case when tasks.status = 'Completed' then 1 else 0 end) as total_completed_tasks"))
                ->leftJoin('tasks','targets.id','tasks.target_id')
                ->where('targets.goal_id','=',$goal_id)
                ->groupBy('targets.id')
                ->groupBy('targets.title')
                ->get();
        }catch (QueryException $exception){
            return null;
        }
        return $goalTargets;
    }
}
