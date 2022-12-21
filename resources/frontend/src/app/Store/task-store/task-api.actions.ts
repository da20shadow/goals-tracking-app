import {createAction, props} from "@ngrx/store";
import {Task} from "../../core/models";

const loadTargetTasksSuccess = createAction('[TASK API] Load Target Tasks List Success',props<{tasks: Task[]}>());
const loadTargetTasksFailure = createAction('[TASK API] Load Target Tasks List Failure',props<{error: string}>());

const addTaskSuccess = createAction('[TASK API] Add Task To Target Success',props<{targetId: number,task: Task}>());
const AddTaskFailure = createAction('[TASK API] Add Task To Target Failure',props<{error: string}>());

const updateTaskSuccess = createAction('[TASK API] Update Task Success',props<{changedTask: Task}>());
const updateTaskFailure = createAction('[TASK API] Update Task Failure',props<{error: string}>());

const deleteTaskSuccess = createAction('[TASK API] Delete Task Success',props<{taskId: number}>());
const deleteTaskFailure = createAction('[TASK API] Delete Task Failure',props<{error: string}>());

export const TaskAPIActions = {
  loadTargetTasksSuccess,
  loadTargetTasksFailure,
  addTaskSuccess,
  AddTaskFailure,
  updateTaskSuccess,
  updateTaskFailure,
  deleteTaskSuccess,
  deleteTaskFailure,
}
