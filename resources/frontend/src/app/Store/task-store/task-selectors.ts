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
  state => state.tasksList
);
const selectTasksStateStatus = createSelector(
  selectTasksState,
  state => state.status
);
export const taskSelectors = {
  selectTasksState,
  selectActiveTask,
  selectTargetTasksList,
  selectTasksStateStatus,
}
