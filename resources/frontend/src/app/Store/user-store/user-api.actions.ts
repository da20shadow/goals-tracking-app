import {createAction, props} from "@ngrx/store";
import {User} from "../../core/models";

const loginSuccess = createAction('[USER API] Login Success',props<{user: User}>());
const setUser = createAction('[USER API] Set User Success',props<{user: User}>());
const logoutSuccess = createAction('[USER API] Login Success');



export const UserAPIActions = {
  loginSuccess,
  setUser,
  logoutSuccess
}
