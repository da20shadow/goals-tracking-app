import {createAction, props} from "@ngrx/store";
import {User} from "../../core/models";

const loginSuccess = createAction('[USER API] Login Success',props<{user: User}>());

export const UserAPIActions = {
  loginSuccess,
}
