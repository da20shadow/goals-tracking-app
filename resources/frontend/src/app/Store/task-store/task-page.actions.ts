import {createAction, props} from "@ngrx/store";
import { Task } from "src/app/core/models/task/Task";

const loadTargetTasks = createAction('[TASK PAGE] Load Target Tasks List',props<{targetId: number}>());
const AddTask = createAction('[TASK PAGE] Add Task To Target',props<{targetId: number,task: Task}>());
const updateTask = createAction('[TASK PAGE] Update Task',props<{taskId: number, changedTask: Task}>());
const deleteTask = createAction('[TASK PAGE] Delete Task',props<{taskId: number}>());
const clear = createAction('[TASK PAGE] Clear');

export const TaskPageActions = {
  loadTargetTasks,
  AddTask,
  updateTask,
  deleteTask,
  clear,
}
