import {createAction, props} from "@ngrx/store";
import { Task } from "src/app/core/models/task/Task";

const getActiveTask = createAction('[TASK PAGE] Get Active Tasks',props<{taskId: number}>());
const loadActiveTask = createAction('[TASK PAGE] Load Active Tasks',props<{taskId: number}>());
//TODO: implement subtasks
// const getActiveTaskList = createAction('[TASK PAGE] Get Active Tasks List',props<{targetId: number}>());

const updateActiveTask = createAction('[TASK PAGE] Update Task',props<{taskId: number, changedTask: any}>());

const loadTargetTasks = createAction('[TASK PAGE] Load Target Tasks List',props<{targetId: number}>());

const getUrgentTasks = createAction('[TASK PAGE] Get URGENT Tasks');
const loadUrgentTasks = createAction('[TASK PAGE] Load URGENT Tasks');

const getImportantTasks = createAction('[TASK PAGE] Get IMPORTANT Tasks');
const loadImportantTasks = createAction('[TASK PAGE] Load IMPORTANT Tasks');

const AddTask = createAction('[TASK PAGE] Add Task To Target',props<{targetId: number,task: Task}>());

const updateTask = createAction('[TASK PAGE] Update Task',props<{taskId: number, changedTask: any}>());
const deleteTask = createAction('[TASK PAGE] Delete Task',props<{taskId: number}>());
const clear = createAction('[TASK PAGE] Clear');

export const TaskPageActions = {
  getActiveTask,
  loadActiveTask,
  updateActiveTask,
  loadTargetTasks,
  getUrgentTasks,
  loadUrgentTasks,
  AddTask,
  updateTask,
  deleteTask,
  clear,
  getImportantTasks,
  loadImportantTasks,

}
