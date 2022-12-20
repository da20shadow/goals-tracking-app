import {createAction, props} from "@ngrx/store";

const getUser = createAction('[USER Page] Get User Profile');
const logout = createAction('[USER Page] User Logout');

export const UserPageActions = {
  getUser,
  logout,
}
