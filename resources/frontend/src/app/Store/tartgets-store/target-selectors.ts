import {createSelector} from "@ngrx/store";
import {selectAppState} from "../app.state";

const selectTargetsState = createSelector(
  selectAppState,
  (state) => state.targetsState
);
const selectTargetsList = createSelector(
  selectTargetsState,
  (state) => state.targets
);
const selectTargetsLoadStatus = createSelector(
  selectTargetsState,
  (state) => state.status
);
const selectActiveTarget = createSelector(
  selectTargetsState,
  (state) => state.activeTarget
);
const selectGoalId = createSelector(
  selectTargetsState,
  (state) => state.goalId
);

export const targetSelectors = {
  selectTargetsState,
  selectTargetsList,
  selectTargetsLoadStatus,
  selectActiveTarget,
  selectGoalId
}
