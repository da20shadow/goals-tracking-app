import {createReducer, on} from "@ngrx/store";
import { Task } from "src/app/core/models";
import {TaskAPIActions} from "./task-api.actions";
import {TaskPageActions} from "./task-page.actions";

export interface TasksState {
  targetTasksList: Task[];
  urgentTasksList: Task[];
  importantTasksList: Task[];
  activeTask: Task|null;
  error: string|null;
  targetTasksListStatus: 'pending'|'loading'|'error'|'success';
  urgentTasksListStatus: 'pending'|'loading'|'error'|'success';
  importantTasksListStatus: 'pending'|'loading'|'error'|'success';
}

const initialState: TasksState = {
  targetTasksList: [],
  urgentTasksList: [],
  importantTasksList: [],
  activeTask: null,
  error: null,
  targetTasksListStatus: 'pending',
  urgentTasksListStatus: 'pending',
  importantTasksListStatus: 'pending',
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
    if (!tasks){tasks = []}
    return ({...state,targetTasksList: tasks,targetTasksListStatus:'success'})
  }),
  on(TaskAPIActions.addTaskSuccess, (state,{task})=> {
    return ({...state,targetTasksList: [task,...state.targetTasksList]})
  }),
  on(TaskAPIActions.AddTaskFailure, (state,{error})=> {
    return ({...state,error})
  }),
  on(TaskAPIActions.addUrgentTaskSuccess, (state,{task})=> {
    return ({...state,urgentTasksList: [...state.urgentTasksList,task]})
  }),
  on(TaskAPIActions.updateTaskSuccess,(state,{changedTask})=> {
    console.log(changedTask)
    if (changedTask.target_id){
      return ({...state, targetTasksList: state.targetTasksList.map(t => t.id === changedTask.id ? changedTask : t)})
    }else if (changedTask.priority === 'Urgent' && changedTask.end_date){
      return ({...state, urgentTasksList: state.urgentTasksList.map(t => t.id === changedTask.id ? changedTask : t)})
    }else if (changedTask.priority === 'High'){
      return ({...state, importantTasksList: state.urgentTasksList.map(t => t.id === changedTask.id ? changedTask : t)})
    }
    return state;
  }),
  on(TaskAPIActions.updateTaskFailure, (state,{error})=> {
    return ({...state,error})
  }),
  on(TaskAPIActions.deleteTaskSuccess,(state,{taskId})=>{
    return ({...state,targetTasksList: state.targetTasksList.filter(t => t.id !== taskId)})
  }),
  on(TaskAPIActions.deleteTaskFailure, (state,{error})=>{
    return ({...state,error})
  }),
  on(TaskAPIActions.loadUrgentTasksSuccess, (state,{tasks}) => {
    if (!tasks){tasks=[]}
    return ({...state,urgentTasksList: tasks,urgentTasksListStatus:'success'})
  }),
  on(TaskAPIActions.loadImportantTasksSuccess, (state,{tasks}) => {
    if (!tasks){tasks=[]}
    return ({...state,importantTasksList: tasks,importantTasksListStatus:'success'})
  }),
  on(TaskPageActions.clear, () => initialState)
)
