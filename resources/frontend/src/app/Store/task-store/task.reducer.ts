import {createReducer, on} from "@ngrx/store";
import { Task } from "src/app/core/models";
import {TaskAPIActions} from "./task-api.actions";
import {TaskPageActions} from "./task-page.actions";

export interface TasksState {
  tasksList: Task[];
  activeTask: Task|null;
  error: string|null;
  status: 'pending'|'loading'|'error'|'success';
}

const initialState: TasksState = {
  tasksList: [],
  activeTask: null,
  error: null,
  status: 'pending',
}

export const TaskReducer = createReducer(
  initialState,
  on(TaskAPIActions.loadActiveTaskSuccess, (state,{task})=> {
    return ({...state,activeTask: task})
  }),
  on(TaskAPIActions.loadActiveTaskFailure, (state,{error})=> {
    return ({...state,error})
  }),
  on(TaskAPIActions.updateActiveTaskSuccess, (state,{changedTask})=> {
    return ({...state,activeTask: changedTask})
  }),
  on(TaskAPIActions.updateActiveTaskFailure, (state,{error})=> {
    return ({...state,error})
  }),
  on(TaskAPIActions.loadTargetTasksSuccess, (state,{tasks}) => {
    return ({...state,tasksList: tasks,status:'success'})
  }),
  on(TaskAPIActions.addTaskSuccess, (state,{task})=> {
    return ({...state,tasksList: [task,...state.tasksList]})
  }),
  on(TaskAPIActions.AddTaskFailure, (state,{error})=> {
    return ({...state,error})
  }),
  on(TaskAPIActions.updateTaskSuccess,(state,{changedTask})=> {
    return ({...state, tasksList: state.tasksList.map(t => t.id === changedTask.id ? changedTask : t)})
  }),
  on(TaskAPIActions.updateTaskFailure, (state,{error})=> {
    return ({...state,error})
  }),
  on(TaskAPIActions.deleteTaskSuccess,(state,{taskId})=>{
    return ({...state,tasksList: state.tasksList.filter(t => t.id !== taskId)})
  }),
  on(TaskAPIActions.deleteTaskFailure, (state,{error})=>{
    return ({...state,error})
  }),
  on(TaskPageActions.clear, () => initialState)
)
