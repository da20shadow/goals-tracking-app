import {createSelector} from "@ngrx/store";
import {selectAppState} from "../app.state";

const selectAgendaState = createSelector(
  selectAppState,
  (state) => state.agendaState
);
const selectTodayTasksStatus = createSelector(
  selectAgendaState,
  (state) => state.todayTasksStatus
);
const selectOverdueTasksStatus = createSelector(
  selectAgendaState,
  (state) => state.overdueTasksStatus
);
const selectNextTasksStatus = createSelector(
  selectAgendaState,
  (state) => state.nextTasksStatus
);
const selectUnscheduledTasksStatus = createSelector(
  selectAgendaState,
  (state) => state.unscheduledTasksStatus
);
const selectTodayTasks = createSelector(
  selectAgendaState,
  (state) => state.todayTasks
);
const selectNextTasks = createSelector(
  selectAgendaState,
  (state) => state.nextTasks
);
const selectOverdueTasks = createSelector(
  selectAgendaState,
  (state) => state.overdueTasks
);
const selectUnscheduledTasks = createSelector(
  selectAgendaState,
  (state) => state.unscheduledTasks
);

export const agendaSelectors = {
  selectAgendaState,
  selectTodayTasks,
  selectNextTasks,
  selectOverdueTasks,
  selectUnscheduledTasks,
  selectTodayTasksStatus,
  selectOverdueTasksStatus,
  selectNextTasksStatus,
  selectUnscheduledTasksStatus
}
