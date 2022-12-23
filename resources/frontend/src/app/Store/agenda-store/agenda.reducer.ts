import {Task} from "src/app/core/models";
import {createReducer, on} from "@ngrx/store";
import {AgendaAPIActions} from "./agenda-api.actions";
import {AgendaPageActions} from "./agenda-page.actions";

export interface AgendaState {
  todayTasks: Task[];
  overdueTasks: Task[];
  nextTasks: Task[];
  unscheduled: Task[];
  error: null|string;
  status: 'pending'|'loading'|'error'|'loadedTodayTasks'|'all'
}

const initialState: AgendaState = {
  todayTasks: [],
  overdueTasks: [],
  nextTasks: [],
  unscheduled: [],
  error: null,
  status: 'pending'
}

export const AgendaReducer = createReducer(
  initialState,
  on(AgendaPageActions.loadTodayTasks,(state) => {
    return ({...state,status:'loading'})
  }),
  on(AgendaAPIActions.loadTodayTasksSuccess,(state,{todayTasks}) => {
    return ({...state,todayTasks,status:'loadedTodayTasks',error:null})
  }),
  on(AgendaAPIActions.loadTodayTasksFailure, (state,{error})=>{
    return({...state,error,status: 'error'})
  })
)
