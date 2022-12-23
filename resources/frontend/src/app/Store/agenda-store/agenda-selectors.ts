import {createSelector} from "@ngrx/store";
import {selectAppState} from "../app.state";

const selectAgendaState = createSelector(
  selectAppState,
  (state) => state.agendaState
);
const selectAgendaStateStatus = createSelector(
  selectAgendaState,
  (state) => state.status
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
  (state) => state.unscheduled
);

export const agendaSelectors = {
  selectAgendaState,
  selectTodayTasks,
  selectNextTasks,
  selectOverdueTasks,
  selectUnscheduledTasks,
  selectAgendaStateStatus
}
