import {Task} from "src/app/core/models";
import {createReducer, on} from "@ngrx/store";
import {AgendaAPIActions} from "./agenda-api.actions";
import {AgendaPageActions} from "./agenda-page.actions";

export interface AgendaState {
  todayTasks: Task[];
  overdueTasks: Task[];
  nextTasks: Task[];
  unscheduledTasks: Task[];
  error: null|string;
  todayTasksStatus: 'pending'|'loading'|'error'|'success';
  overdueTasksStatus: 'pending'|'loading'|'error'|'success';
  nextTasksStatus: 'pending'|'loading'|'error'|'success';
  unscheduledTasksStatus: 'pending'|'loading'|'error'|'success';
}

const initialState: AgendaState = {
  todayTasks: [],
  overdueTasks: [],
  nextTasks: [],
  unscheduledTasks: [],
  error: null,
  todayTasksStatus: 'pending',
  overdueTasksStatus: 'pending',
  nextTasksStatus: 'pending',
  unscheduledTasksStatus: 'pending'
}

export const AgendaReducer = createReducer(
  initialState,
  on(AgendaPageActions.loadTodayTasks,(state) => {
    return ({...state,todayTasksStatus:'loading'})
  }),
  on(AgendaAPIActions.loadTodayTasksSuccess,(state,{todayTasks}) => {
    return ({...state,todayTasks,todayTasksStatus:'success',error:null})
  }),
  on(AgendaAPIActions.loadTodayTasksFailure, (state,{error})=>{
    return({...state,error,todayTasksStatus: 'error'})
  }),
  on(AgendaPageActions.loadOverdueTasks,(state) => {
    return ({...state,overdueTasksStatus:'loading'})
  }),
  on(AgendaAPIActions.loadOverdueTasksSuccess,(state,{overdueTasks}) => {
    return ({...state,overdueTasks,overdueTasksStatus:'success',error:null})
  }),
  on(AgendaAPIActions.loadOverdueTasksFailure, (state,{error})=>{
    return({...state,error,overdueTasksStatus: 'error'})
  }),
  on(AgendaPageActions.loadNextTasks,(state) => {
    return ({...state,nextTasksStatus:'loading'})
  }),
  on(AgendaAPIActions.loadNextTasksSuccess,(state,{nextTasks}) => {
    return ({...state,nextTasks,overdueTasksStatus:'success',error:null})
  }),
  on(AgendaAPIActions.loadNextTasksFailure, (state,{error})=>{
    return({...state,error,nextTasksStatus: 'error'})
  }),
  on(AgendaPageActions.loadUnscheduledTasks,(state) => {
    return ({...state,unscheduledTasksStatus:'loading'})
  }),
  on(AgendaAPIActions.loadUnscheduledTasksSuccess,(state,{unscheduledTasks}) => {
    return ({...state,unscheduledTasks,unscheduledTasksStatus:'success',error:null})
  }),
  on(AgendaAPIActions.loadUnscheduledTasksFailure, (state,{error})=>{
    return({...state,error,unscheduledTasksStatus: 'error'})
  })
)
