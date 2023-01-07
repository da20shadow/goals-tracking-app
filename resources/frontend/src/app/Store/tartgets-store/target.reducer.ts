import {createReducer, on} from "@ngrx/store";
import {Target} from "../../core/models";
import {TargetApiActions} from "./target-api.actions";
import {TargetPageActions} from "./target-page.actions";

export interface TargetState {
  goalId: number|null
  targets: Target[];
  activeTarget: Target|null;
  error: string|null;
  status: 'pending'|'loading'|'error'|'success';
}


const initialState: TargetState = {
  goalId: null,
  targets: [],
  error: null,
  activeTarget: null,
  status: 'pending',
}

export const TargetReducer = createReducer(
  initialState,
  on(TargetPageActions.clear,()=>initialState),
  on(TargetApiActions.loadTargetsListSuccess, (state,{targets}) => {
    if (!targets){targets = []}
    return ({...state, targets, error: null, status: 'success'})
  }),
  on(TargetApiActions.addTargetSuccess, (state,{target}) => {
    return ({...state,targets: [target,...state.targets],error:null})
  }),
  on(TargetApiActions.addTargetFailure, (state,{error}) => {
    return ({...state,error})
  }),
  on(TargetApiActions.updateActiveTargetSuccess, (state,{target}) => {
    return ({...state, activeTarget: target})
  }),
  on(TargetApiActions.updateActiveTargetFailure, (state,{error}) => {
    return ({...state,error})
  }),
  on(TargetApiActions.deletedActiveTargetSuccess, (state) => {
    return ({...state,activeTarget: null})
  }),
  on(TargetApiActions.deleteActiveTargetFailure, (state,{error}) => {
    return ({...state,error})
  }),
)
