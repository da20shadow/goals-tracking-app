import {createAction, props} from "@ngrx/store";
import { Task } from "src/app/core/models";

const loadTodayTasksSuccess = createAction("[AGENDA PAGE] Get Today's Tasks Success",props<{todayTasks: Task[]}>());
const loadTodayTasksFailure = createAction("[AGENDA PAGE] Get Today's Tasks Failure",props<{error: string}>());



export const AgendaAPIActions = {
  loadTodayTasksSuccess,
  loadTodayTasksFailure,
}
