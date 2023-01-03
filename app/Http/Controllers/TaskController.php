<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{
    public function index(): JsonResponse
    {
        $user_id = auth()->user()->getAuthIdentifier();

        $today = date('Y-m-d');

        try {
            $tasksList = DB::table('tasks')
                ->where(['user_id' => $user_id])
                ->where('status', '!=', 'Completed')
                ->whereDate('start_date', '=', $today)
                ->orWhereDate('end_date', '=', $today)
                ->orderBy('priority', 'desc')
                ->orderBy('end_date')
                ->get();
        } catch (QueryException $exception) {
            return response()->json([
                'message' => 'An Error Occur! Please, try again!',
                'error' => $exception->getMessage(),
            ], 400);
        }

        if (count($tasksList) < 1) {
            return response()->json([
                'message' => 'No Tasks Yet!'
            ], 204);
        }
        return response()->json($tasksList);
    }

    public function getAll(): JsonResponse
    {
        $user_id = auth()->user()->getAuthIdentifier();

        try {
            $tasksList = DB::table('tasks')
                ->where(['user_id' => $user_id])
                ->orderBy('priority', 'desc')
                ->get();
        } catch (QueryException $exception) {
            return response()->json([
                'message' => 'An Error Occur! Please, try again!',
                'error' => $exception->getMessage(),
            ], 400);
        }

        if (count($tasksList) < 1) {
            return response()->json([
                'message' => 'No Tasks Yet!'
            ], 204);
        }
        return response()->json($tasksList);
    }

    public function getUrgentTasks(): JsonResponse
    {
        $user_id = auth()->user()->getAuthIdentifier();

        try {
            $tasksList = DB::table('tasks')
                ->where(['user_id' => $user_id])
                ->where('status', '!=', 'Completed')
                ->where('priority', '=', 'Urgent')
                ->where('end_date', '!=', 'null')
                ->orderBy('status')
                ->orderBy('end_date')
                ->get();
        } catch (QueryException $exception) {
            return response()->json([
                'message' => 'An Error Occur! Please, try again!',
                'error' => $exception->getMessage(),
            ], 400);
        }

        if (count($tasksList) < 1) {
            return response()->json([
                'message' => 'No Tasks Yet!'
            ], 204);
        }
        return response()->json($tasksList);
    }

    public function getImportantTasks(): JsonResponse
    {
        $user_id = auth()->user()->getAuthIdentifier();
        try {
            $tasksList = DB::table('tasks')
                ->where(['user_id' => $user_id])
                ->where([
                    ['user_id', '=', $user_id],
                    ['status', '!=', 'Completed'],
                    ['priority', '=', 'High'],
                ])
                ->orWhere([
                    ['user_id', '=', $user_id],
                    ['status', '!=', 'Completed'],
                    ['priority', '=', 'Urgent'],
                ])
                ->orderBy('priority', 'desc')
                ->orderBy('end_date')
                ->orderBy('status')
                ->get();
        } catch (QueryException $exception) {
            return response()->json([
                'message' => 'An Error Occur! Please, try again!',
                'error' => $exception->getMessage(),
            ], 400);
        }

        if (count($tasksList) < 1) {
            return response()->json([
                'message' => 'No Tasks Yet!'
            ], 204);
        }
        return response()->json($tasksList);
    }

    public function getOverdueTasks(): JsonResponse
    {
        $user_id = auth()->user()->getAuthIdentifier();

        $today = date('Y-m-d');

        try {
            $tasksList = DB::table('tasks')
                ->where(['user_id' => $user_id])
                ->where('status', '!=', 'Completed')
                ->whereDate('end_date', '<', $today)
                ->orderBy('priority', 'desc')
                ->orderBy('end_date')
                ->get();
        } catch (QueryException $exception) {
            return response()->json([
                'message' => 'An Error Occur! Please, try again!',
                'error' => $exception->getMessage(),
            ], 400);
        }

        if (count($tasksList) < 1) {
            return response()->json([
                'message' => 'No Tasks Yet!'
            ], 204);
        }
        return response()->json($tasksList);
    }

    public function getNextTasks(): JsonResponse
    {
        $user_id = auth()->user()->getAuthIdentifier();

        $today = date('Y-m-d');

        try {
            $tasksList = DB::table('tasks')
                ->where(['user_id' => $user_id])
                ->where('status', '!=', 'Completed')
                ->whereDate('start_date', '>', $today)
                ->orderBy('priority', 'desc')
                ->orderBy('end_date')
                ->get();
        } catch (QueryException $exception) {
            return response()->json([
                'message' => 'An Error Occur! Please, try again!',
                'error' => $exception->getMessage(),
            ], 400);
        }

        if (count($tasksList) < 1) {
            return response()->json([
                'message' => 'No Tasks Yet!'
            ], 204);
        }
        return response()->json($tasksList);
    }

    public function getUnscheduledTasks(): JsonResponse
    {
        $user_id = auth()->user()->getAuthIdentifier();

        try {
            $tasksList = DB::select(DB::raw("SELECT *
                                        from `tasks`
                                        where `user_id` = $user_id
                                        and `status` != 'Completed'
                                        and `start_date` is NULL
                                        and `end_date` is NULL
                                        order by `priority` desc"));
        } catch (QueryException $exception) {
            return response()->json([
                'message' => 'An Error Occur! Please, try again!',
                'error' => $exception->getMessage(),
            ], 400);
        }

        if (count($tasksList) < 1) {
            return response()->json([
                'message' => 'No Tasks Yet!'
            ], 204);
        }
        return response()->json($tasksList);
    }

    public function store(Request $request): JsonResponse
    {
        $fields = $request->validate([
            'title' => ['required', 'string', 'min:5', 'max:145'],
            'description' => ['string', 'min:5'],
            'start_date' => ['date'],
            'end_date' => ['date'],
            'status' => ['string'],
            'priority' => ['string'],
            'target_id' => ['Integer']
        ]);

        $user_id = auth()->user()->getAuthIdentifier();

        //Check if target ID exist
        if (isset($fields['target_id'])) {
            try {
                $targetExist = DB::table('targets')
                    ->where('user_id', $user_id)
                    ->where('id', $fields['target_id'])
                    ->first();
            } catch (QueryException $exception) {
                return response()->json([
                    'message' => 'An Error Occur! Please, try again!',
                    'error' => $exception->getMessage()
                ], 400);
            }

            if (!$targetExist) {
                return response()->json(['message' => 'There is no target with this ID!'], 400);
            }

            //Check if task title exist already in this target
            $target_id = $fields['target_id'];
            try {
                $taskTitleExist = Task::where('user_id', $user_id)
                    ->where('target_id', $target_id)
                    ->where('title', $fields['title'])->first();
            } catch (QueryException $exception) {
                return response()->json([
                    'message' => 'An Error Occur! Please, try again!',
                    'error' => $exception->getMessage()
                ], 400);
            }

            if ($taskTitleExist !== null) {
                return response()->json(['message' => 'Task with the same title already added! Just set it recur!'], 400);
            }
        }

        $fields['user_id'] = $user_id;

        try {
            Task::create($fields);
        } catch (QueryException $exception) {
            return response()->json([
                'message' => 'An Error Occur! Please, try again!',
                'error' => $exception->getMessage()
            ], 400);
        }
        $task = Task::where('user_id', $user_id)
            ->where('title', $fields['title'])->first();

        return response()->json([
            'message' => 'Successfully added new task!',
            'task' => $task,
        ], 201);
    }

    public function show($id): JsonResponse
    {
        $user_id = auth()->user()->getAuthIdentifier();
        $result = self::chekIfExist($user_id, $id);
        if ($result['error'] === true) {
            return response()->json([
                'message' => $result['message']
            ], 400);
        }
        return response()->json($result['task']);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $user_id = auth()->user()->getAuthIdentifier();

        $result = self::chekIfExist($user_id, $id);
        if ($result['error'] === true) {
            return response()->json(['message' => $result['message']], 400);
        }

        $fields = $request->all();

        $message = [];

        if (isset($fields['title'])) {
            $inputTitle = $request->validate(['title' => ['string', 'min:5', 'max:145']]);
            try {
                Task::where('user_id', $user_id)->where('id', $id)
                    ->update(['title' => $inputTitle['title']]);
            } catch (QueryException $exception) {
                return response()->json([
                    'message' => 'An Error Occur! Please, try again!',
                    'error' => $exception->getMessage()
                ], 400);
            }
            array_push($message, 'Successfully updated task title!');
        }

        if (isset($fields['description'])) {
            $inputDesc = $request->validate(['description' => ['string']]);

            try {
                Task::where('user_id', $user_id)->where('id', $id)
                    ->update(['description' => $inputDesc['description']]);
            } catch (QueryException $exception) {
                return response()->json([
                    'message' => 'An Error Occur! Please, try again!',
                    'error' => $exception->getMessage()
                ], 400);
            }
            array_push($message, 'Successfully updated task description!');
        }

        if (isset($fields['status'])) {
            $inputStatus = $request->validate(['status' => ['string']]);

            try {
                Task::where('user_id', $user_id)->where('id', $id)
                    ->update(['status' => $inputStatus['status']]);
            } catch (QueryException $exception) {
                return response()->json([
                    'message' => 'An Error Occur! Please, try again!',
                    'error' => $exception->getMessage()
                ], 400);
            }
            array_push($message, 'Successfully updated task status!');
        }

        if (isset($fields['end_date'])) {
            $inputDueDate = $request->validate(['end_date' => ['Date']]);

            try {
                Task::where('user_id', $user_id)->where('id', $id)
                    ->update(['end_date' => $inputDueDate['end_date']]);
            } catch (QueryException $exception) {
                return response()->json([
                    'message' => 'An Error Occur! Please, try again!',
                    'error' => $exception->getMessage()
                ], 400);
                //TODO: log the error!
            }
            array_push($message, 'Successfully updated task End Date!');
        }

        if (isset($fields['start_date'])) {
            $inputDueDate = $request->validate(['start_date' => ['Date']]);

            try {
                Task::where('user_id', $user_id)->where('id', $id)
                    ->update(['start_date' => $inputDueDate['start_date']]);
            } catch (QueryException $exception) {
                return response()->json([
                    'message' => 'An Error Occur! Please, try again!',
                    'error' => $exception->getMessage()
                ], 400);
                //TODO: log the error!
            }
            array_push($message, 'Successfully updated task Start Date!');
        }

        if (isset($fields['priority'])) {
            $inputDesc = $request->validate(['priority' => ['string']]);

            try {
                Task::where('user_id', $user_id)->where('id', $id)
                    ->update(['priority' => $inputDesc['priority']]);
            } catch (QueryException $exception) {
                return response()->json([
                    'message' => 'An Error Occur! Please, try again!',
                    'error' => $exception->getMessage()
                ], 400);
                //TODO: log the error!
            }
            array_push($message, 'Successfully updated task priority!');
        }

        $task = Task::where('user_id', $user_id)
            ->where('id', $id)->first();

        return response()->json([
            'message' => $message,
            'task' => $task,
        ]);
    }

    public function destroy($id): JsonResponse
    {
        $user_id = auth()->user()->getAuthIdentifier();

        $result = self::chekIfExist($user_id, $id);
        if ($result['error'] === true) {
            return response()->json(['message' => $result['message']], 400);
        }

        $result = DB::table('tasks')
            ->where('id', $id)
            ->where('user_id', $user_id)
            ->delete();

        if (!$result) {
            return response()->json([
                'message' => 'Error! Such task not exist!'
            ], 400);
        }
        return response()->json([
            'message' => 'Successfully deleted task!',
            'task_id' => $id
        ]);
    }

    private static function chekIfExist(mixed $user_id, int $task_id): array
    {
        $result = ['error' => false, 'message' => ''];
        try {
            $taskExist = DB::table('tasks')
                ->where(['id' => $task_id, 'user_id' => $user_id])
                ->first();
        } catch (QueryException $exception) {
            $result['error'] = true;
            $result['message'] = $exception->getMessage();
            return $result;
            //TODO: log the error!
        }

        if (null === $taskExist) {
            $result['error'] = true;
            $result['message'] = 'Such task not exist!';
        }

        $result['task'] = $taskExist;
        return $result;
    }
}
