import {createSelector} from "@ngrx/store";
import {selectAppState} from "../app.state";

const selectTasksState = createSelector(
  selectAppState,
  (state) => state.tasksState
);
const selectActiveTask = createSelector(
  selectTasksState,
  state => state.activeTask
);
const selectTargetTasksList = createSelector(
  selectTasksState,
  state => state.targetTasksList
);
const selectUrgentTasksList = createSelector(
  selectTasksState,
  state => state.urgentTasksList
);
const selectImportantTasksList = createSelector(
  selectTasksState,
  state => state.importantTasksList
);
const selectTargetTasksStateStatus = createSelector(
  selectTasksState,
  state => state.targetTasksListStatus
);
const selectUrgentTasksStateStatus = createSelector(
  selectTasksState,
  state => state.urgentTasksListStatus
);
const selectImportantTasksStateStatus = createSelector(
  selectTasksState,
  state => state.importantTasksListStatus
);
export const taskSelectors = {
  selectTasksState,
  selectActiveTask,
  selectTargetTasksList,
  selectUrgentTasksList,
  selectImportantTasksList,
  selectTargetTasksStateStatus,
  selectUrgentTasksStateStatus,
  selectImportantTasksStateStatus
}
