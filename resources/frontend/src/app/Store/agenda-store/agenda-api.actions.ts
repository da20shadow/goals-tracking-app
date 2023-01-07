import {createAction, props} from "@ngrx/store";
import { Task } from "src/app/core/models";

const loadTodayTasksSuccess = createAction("[AGENDA PAGE] Load Today's Tasks Success",props<{todayTasks: Task[]}>());
const loadTodayTasksFailure = createAction("[AGENDA PAGE] Load Today's Tasks Failure",props<{error: string}>());

const loadOverdueTasksSuccess = createAction("[AGENDA PAGE] Load Overdue Tasks Success",props<{overdueTasks: Task[]}>());
const loadOverdueTasksFailure = createAction("[AGENDA PAGE] Load Overdue Tasks Failure",props<{error: string}>());

const loadNextTasksSuccess = createAction("[AGENDA PAGE] Load Next Tasks Success",props<{nextTasks: Task[]}>());
const loadNextTasksFailure = createAction("[AGENDA PAGE] Load Next Tasks Failure",props<{error: string}>());

const loadUnscheduledTasksSuccess = createAction("[AGENDA PAGE] Load Unscheduled Tasks Success",props<{unscheduledTasks: Task[]}>());
const loadUnscheduledTasksFailure = createAction("[AGENDA PAGE] Load Unscheduled Tasks Failure",props<{error: string}>());

const addTodayTaskSuccess = createAction("[AGENDA PAGE] ADD TODAY'S TASK Success",props<{task:Task}>())

const updateTaskSuccess = createAction("[AGENDA PAGE] UPDATE TASK Success",props<{oldTaskState:Task,changedTask:Task}>())
const updateTaskFailure = createAction("[AGENDA PAGE] UPDATE TASK Failure",props<{error: string}>())

export const AgendaAPIActions = {
  loadTodayTasksSuccess,
  loadTodayTasksFailure,
  loadOverdueTasksSuccess,
  loadOverdueTasksFailure,
  loadNextTasksSuccess,
  loadNextTasksFailure,
  loadUnscheduledTasksSuccess,
  loadUnscheduledTasksFailure,
  addTodayTaskSuccess,
  updateTaskSuccess,
  updateTaskFailure,
}
