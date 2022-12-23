import {createAction} from "@ngrx/store";

const getTodayTasks = createAction("[AGENDA PAGE] Get Today's Tasks");
const loadTodayTasks = createAction("[AGENDA PAGE] Get Today's Tasks");

export const AgendaPageActions = {
  getTodayTasks,
  loadTodayTasks,
}
