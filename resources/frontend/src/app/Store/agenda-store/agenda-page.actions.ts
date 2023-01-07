import {createAction, props} from "@ngrx/store";
import { Task } from "src/app/core/models";

const getTodayTasks = createAction("[AGENDA PAGE] Get Today's Tasks");
const loadTodayTasks = createAction("[AGENDA PAGE] Load Today's Tasks");

const getOverdueTasks = createAction("[AGENDA PAGE] Get Overdue Tasks");
const loadOverdueTasks = createAction("[AGENDA PAGE] Load Overdue Tasks");

const getNextTasks = createAction("[AGENDA PAGE] Get Next Tasks");
const loadNextTasks = createAction("[AGENDA PAGE] Load Next Tasks");

const getUnscheduledTasks = createAction("[AGENDA PAGE] Get Unscheduled Tasks");
const loadUnscheduledTasks = createAction("[AGENDA PAGE] Load Unscheduled Tasks");

const updateTask = createAction("[AGENDA PAGE] Update Task",props<{oldTaskState:Task,changedFieldsTask:any}>())

export const AgendaPageActions = {
  getTodayTasks,
  loadTodayTasks,
  getOverdueTasks,
  loadOverdueTasks,
  getNextTasks,
  loadNextTasks,
  getUnscheduledTasks,
  loadUnscheduledTasks,
  updateTask
}
