import {User} from "../../core/models";
import {createReducer, on} from "@ngrx/store";
import {UserAPIActions} from "./user-api.actions";

export interface UserState {
  user: User|null;
  error: string|null;
  isLoggedIn: boolean;
  status: 'pending'|'loading'|'error'|'success';
}

const initialState: UserState = {
  user: null,
  error:null,
  isLoggedIn: false,
  status: 'pending'
}

export const UserReducer = createReducer(
  initialState,
  on(UserAPIActions.setIsLoggedSuccess,(state)=>{
    return ({...state,isLoggedIn:true})
  }),
  on(UserAPIActions.setIsLoggedFailure,()=>initialState),
  on(UserAPIActions.loginSuccess, (state,{user}) => {
    if (!user){return state;}
    return ({
      ...state,
      user:user,
      error:null,
      isLoggedIn: true,
      status: 'success'
    })
  }),
  on(UserAPIActions.setUser, (state,{user}) => {
    return ({
      ...state,
      user: user,
      isLoggedIn: true,
    })
  }),
  on(UserAPIActions.logoutSuccess, () => initialState)
)
