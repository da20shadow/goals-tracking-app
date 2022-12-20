import {User} from "../../core/models";
import {createReducer, on} from "@ngrx/store";
import {UserAPIActions} from "./user-api.actions";

export interface UserState {
  user: User|null;
  error: string|null;
  status: 'pending'|'loading'|'error'|'success';
}

const initialState: UserState = {
  user: null,
  error:null,
  status: 'pending'
}

export const UserReducer = createReducer(
  initialState,
  on(UserAPIActions.loginSuccess, (state,{user}) => {
    return ({
      ...state,
      user:user,
      error:null,
      status: 'success'
    })
  }),
  on(UserAPIActions.setUser, (state,{user}) => {
    return ({
      ...state,
      user: user
    })
  }),
  on(UserAPIActions.logoutSuccess, () => initialState)
)
