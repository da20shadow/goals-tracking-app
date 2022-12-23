import {createSelector} from "@ngrx/store";
import {selectAppState} from "../app.state";

const selectUserState = createSelector(
  selectAppState,
  (state) => state.userState
);
const selectUserStateStatus = createSelector(
  selectUserState,
  (state) => state.status
);
const selectUser = createSelector(
  selectUserState,
  (state) => state.user
);
const selectIsLoggedIn = createSelector(
  selectUserState,
  (state) => state.isLoggedIn
);

export const userSelectors = {
  selectUserState,
  selectIsLoggedIn,
  selectUserStateStatus,
  selectUser,
}
