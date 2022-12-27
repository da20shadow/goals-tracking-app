import {createAction, props} from "@ngrx/store";
import {User} from "../../core/models";

const loginSuccess = createAction('[USER API] Login Success',props<{user: User}>());

const setUser = createAction('[USER API] Set User Success',props<{user: User}>());

const setIsLoggedSuccess = createAction('[USER API] Set Is Logged Success');
const setIsLoggedFailure = createAction('[USER API] Set Is Logged Failure');

const logoutSuccess = createAction('[USER API] Logout Success');



export const UserAPIActions = {
  loginSuccess,
  setIsLoggedSuccess,
  setIsLoggedFailure,
  setUser,
  logoutSuccess
}
