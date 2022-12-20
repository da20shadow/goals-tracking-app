import {createSelector} from "@ngrx/store";
import {selectAppState} from "../app.state";

const selectGoalsListState = createSelector(
  selectAppState,
  (state) => state.goalsState
);
const selectGoalsList = createSelector(
  selectGoalsListState,
  (state) => state.goals
);
const selectActiveGoal = createSelector(
  selectGoalsListState,
  (state)=>state.activeGoal
);
const selectGoalsListLoadStatus = createSelector(
  selectGoalsListState,
  (state)=>state.status
);
export const goalsListSelectors = {
  selectGoalsListState,
  selectGoalsList,
  selectGoalsListLoadStatus,
  selectActiveGoal
}
