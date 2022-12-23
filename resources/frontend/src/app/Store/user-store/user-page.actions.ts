import {createAction, props} from "@ngrx/store";

const getUser = createAction('[USER Page] Get User Profile');

const loginCheck = createAction('[USER Page] Login Check');

const logout = createAction('[USER Page] User Logout');

export const UserPageActions = {
  getUser,
  loginCheck,
  logout,
}
