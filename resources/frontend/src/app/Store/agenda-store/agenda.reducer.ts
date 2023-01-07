import {Task, TaskStatus} from "src/app/core/models";
import {createReducer, on} from "@ngrx/store";
import {AgendaAPIActions} from "./agenda-api.actions";
import {AgendaPageActions} from "./agenda-page.actions";

const taskTimeFrame = {
  TODAY: 'todayTasks',
  OVERDUE: 'overdueTasks',
  NEXT: 'nextTasks',
  UNSCHEDULED: 'unscheduledTasks',
}
export interface AgendaState {
  todayTasks: Task[];
  overdueTasks: Task[];
  nextTasks: Task[];
  unscheduledTasks: Task[];
  error: null | string;
  todayTasksStatus: 'pending' | 'loading' | 'error' | 'success';
  overdueTasksStatus: 'pending' | 'loading' | 'error' | 'success';
  nextTasksStatus: 'pending' | 'loading' | 'error' | 'success';
  unscheduledTasksStatus: 'pending' | 'loading' | 'error' | 'success';
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
  on(AgendaPageActions.loadTodayTasks, (state) => {
    return ({...state, todayTasksStatus: 'loading'})
  }),
  on(AgendaAPIActions.loadTodayTasksSuccess, (state, {todayTasks}) => {
    if (!todayTasks) {
      todayTasks = [];
    }
    return ({...state, todayTasks, todayTasksStatus: 'success', error: null})
  }),
  on(AgendaAPIActions.loadTodayTasksFailure, (state, {error}) => {
    return ({...state, error, todayTasksStatus: 'error'})
  }),
  on(AgendaAPIActions.updateTaskSuccess, (state, {oldTaskState, changedTask}) => {
    //TODO: simplify it in 2 lines somehow!
    const oldTaskTimeFrameType = checkTaskTypeFrame(oldTaskState);
    const changedTaskTimeFrame = checkTaskTypeFrame(changedTask);
    const sameFrame = oldTaskTimeFrameType === changedTaskTimeFrame;

    let oldTaskList;
    let taskList;

    switch (oldTaskTimeFrameType){
      case taskTimeFrame.TODAY:
        if (!sameFrame){
          oldTaskList = state.todayTasks.filter(t => t.id !== changedTask.id);
          switch (changedTaskTimeFrame) {
            case taskTimeFrame.TODAY:
              return ({
                ...state,
                [oldTaskTimeFrameType]: oldTaskList,
                todayTasks: [...state.todayTasks,changedTask]
              })
            case taskTimeFrame.NEXT:
              return ({
                ...state,
                [oldTaskTimeFrameType]: oldTaskList,
                nextTasks: [...state.nextTasks,changedTask]
              })
            case taskTimeFrame.OVERDUE:
              return ({
                ...state,
                [oldTaskTimeFrameType]: oldTaskList,
                overdueTasks: [...state.overdueTasks,changedTask]
              })
            case taskTimeFrame.UNSCHEDULED:
              return ({
                ...state,
                [oldTaskTimeFrameType]: oldTaskList,
                unscheduledTasks: [...state.unscheduledTasks,changedTask]
              })
          }
        }
        if (changedTask.status === TaskStatus.COMPLETED) {
          taskList = state.todayTasks.filter(t => t.id !== changedTask.id);
        }else {
          taskList = state.todayTasks.map(t => t.id === changedTask.id ? changedTask : t);
        }
        break;
      case taskTimeFrame.NEXT:
        console.log('From NEXT to TODAY?')
        if (!sameFrame){
          oldTaskList = state.nextTasks.filter(t => t.id !== changedTask.id);
          switch (changedTaskTimeFrame) {
            case taskTimeFrame.TODAY:
              return ({
                ...state,
                [oldTaskTimeFrameType]: oldTaskList,
                todayTasks: [...state.todayTasks,changedTask]
              })
            case taskTimeFrame.NEXT:
              return ({
                ...state,
                [oldTaskTimeFrameType]: oldTaskList,
                nextTasks: [...state.nextTasks,changedTask]
              })
            case taskTimeFrame.OVERDUE:
              return ({
                ...state,
                [oldTaskTimeFrameType]: oldTaskList,
                overdueTasks: [...state.overdueTasks,changedTask]
              })
            case taskTimeFrame.UNSCHEDULED:
              return ({
                ...state,
                [oldTaskTimeFrameType]: oldTaskList,
                unscheduledTasks: [...state.unscheduledTasks,changedTask]
              })
          }
        }

        if (changedTask.status === TaskStatus.COMPLETED) {
          taskList = state.nextTasks.filter(t => t.id !== changedTask.id);
        }else {
          taskList = state.nextTasks.map(t => t.id === changedTask.id ? changedTask : t);
        }
        break;
      case taskTimeFrame.OVERDUE:
        if (!sameFrame){
          oldTaskList = state.overdueTasks.filter(t => t.id !== changedTask.id);
          switch (changedTaskTimeFrame) {
            case taskTimeFrame.TODAY:
              return ({
                ...state,
                [oldTaskTimeFrameType]: oldTaskList,
                todayTasks: [...state.todayTasks,changedTask]
              })
            case taskTimeFrame.NEXT:
              return ({
                ...state,
                [oldTaskTimeFrameType]: oldTaskList,
                nextTasks: [...state.nextTasks,changedTask]
              })
            case taskTimeFrame.OVERDUE:
              return ({
                ...state,
                [oldTaskTimeFrameType]: oldTaskList,
                overdueTasks: [...state.overdueTasks,changedTask]
              })
            case taskTimeFrame.UNSCHEDULED:
              return ({
                ...state,
                [oldTaskTimeFrameType]: oldTaskList,
                unscheduledTasks: [...state.unscheduledTasks,changedTask]
              })
          }
        }

        if (changedTask.status === TaskStatus.COMPLETED) {
          taskList = state.overdueTasks.filter(t => t.id !== changedTask.id);
        }else {
          taskList = state.overdueTasks.map(t => t.id === changedTask.id ? changedTask : t);
        }
        break;
      case taskTimeFrame.UNSCHEDULED:
        if (!sameFrame){
          oldTaskList = state.unscheduledTasks.filter(t => t.id !== changedTask.id);
          switch (changedTaskTimeFrame) {
            case taskTimeFrame.TODAY:
              return ({
                ...state,
                [oldTaskTimeFrameType]: oldTaskList,
                todayTasks: [...state.todayTasks,changedTask]
              })
            case taskTimeFrame.NEXT:
              return ({
                ...state,
                [oldTaskTimeFrameType]: oldTaskList,
                nextTasks: [...state.nextTasks,changedTask]
              })
            case taskTimeFrame.OVERDUE:
              return ({
                ...state,
                [oldTaskTimeFrameType]: oldTaskList,
                overdueTasks: [...state.overdueTasks,changedTask]
              })
            case taskTimeFrame.UNSCHEDULED:
              return ({
                ...state,
                [oldTaskTimeFrameType]: oldTaskList,
                unscheduledTasks: [...state.unscheduledTasks,changedTask]
              })
          }
        }

        if (changedTask.status === TaskStatus.COMPLETED) {
          taskList = state.unscheduledTasks.filter(t => t.id !== changedTask.id);
        }else {
          taskList = state.unscheduledTasks.map(t => t.id === changedTask.id ? changedTask : t);
        }
        break;
    }
    return ({...state, [oldTaskTimeFrameType]: taskList})
  }),
  on(AgendaAPIActions.addTodayTaskSuccess, (state, {task}) => {
    return ({...state, todayTasks: [...state.todayTasks, task]})
  }),
  on(AgendaPageActions.loadOverdueTasks, (state) => {
    return ({...state, overdueTasksStatus: 'loading'})
  }),
  on(AgendaAPIActions.loadOverdueTasksSuccess, (state, {overdueTasks}) => {
    if (!overdueTasks) {
      overdueTasks = []
    }
    return ({...state, overdueTasks, overdueTasksStatus: 'success', error: null})
  }),
  on(AgendaAPIActions.loadOverdueTasksFailure, (state, {error}) => {
    return ({...state, error, overdueTasksStatus: 'error'})
  }),
  on(AgendaPageActions.loadNextTasks, (state) => {
    return ({...state, nextTasksStatus: 'loading'})
  }),
  on(AgendaAPIActions.loadNextTasksSuccess, (state, {nextTasks}) => {
    if (!nextTasks) {
      nextTasks = []
    }
    return ({...state, nextTasks, nextTasksStatus: 'success', error: null})
  }),
  on(AgendaAPIActions.loadNextTasksFailure, (state, {error}) => {
    return ({...state, error, nextTasksStatus: 'error'})
  }),
  on(AgendaPageActions.loadUnscheduledTasks, (state) => {
    return ({...state, unscheduledTasksStatus: 'loading'})
  }),
  on(AgendaAPIActions.loadUnscheduledTasksSuccess, (state, {unscheduledTasks}) => {
    if (!unscheduledTasks) {
      unscheduledTasks = []
    }
    return ({...state, unscheduledTasks, unscheduledTasksStatus: 'success', error: null})
  }),
  on(AgendaAPIActions.loadUnscheduledTasksFailure, (state, {error}) => {
    return ({...state, error, unscheduledTasksStatus: 'error'})
  })
)

const checkTaskTypeFrame = (task: Task) => {
  const today = new Date();
  if (task.start_date) {
    const startDate = new Date(task.start_date);
    if (today.getDate() === startDate.getDate() && today.getMonth() === startDate.getMonth()
      && today.getFullYear() === startDate.getFullYear()) {
      return taskTimeFrame.TODAY;
    }
  }
  if (task.end_date) {
    const endDate = new Date(task.end_date);
    if (today.getDate() === endDate.getDate() && today.getMonth() === endDate.getMonth()
      && today.getFullYear() === endDate.getFullYear()) {
      return taskTimeFrame.TODAY;
    } else if (today.getDate() > endDate.getDate() && today.getMonth() >= endDate.getMonth()
      && today.getFullYear() >= endDate.getFullYear()) {
      return taskTimeFrame.OVERDUE;
    } else if (today.getDate() < endDate.getDate() && today.getMonth() <= endDate.getMonth()
      && today.getFullYear() <= endDate.getFullYear()) {
      return taskTimeFrame.NEXT;
    }
  }

  return taskTimeFrame.UNSCHEDULED;
}
