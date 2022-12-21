import {createAction, props} from "@ngrx/store";
import {Target} from "../../core/models";


const loadTargetsListSuccess = createAction('[TARGET API Load Target Success]', props<{ targets: Target[]; }>());
const loadTargetsListFailure = createAction('[TARGET API Load Target Failure]', props<{ error: string }>());

const addTargetSuccess = createAction('[TARGET API Add Target Success]', props<{ target: Target; }>());
const addTargetFailure = createAction('[TARGET API Add Target Failure]', props<{ error: string; }>());

const updateActiveTargetSuccess = createAction('[TARGET API Update Target Success]', props<{ target: Target; }>());
const updateActiveTargetFailure = createAction('[TARGET API Update Target Failure]', props<{error: string; }>());

const deletedActiveTargetSuccess = createAction('[TARGET API Deleted Active Target Success]');
const deleteActiveTargetFailure = createAction('[TARGET API Delete Active Target Failure]',props<{error: string}>());

export const TargetApiActions = {
  addTargetSuccess,
  addTargetFailure,
  updateActiveTargetSuccess,
  updateActiveTargetFailure,
  deletedActiveTargetSuccess,
  deleteActiveTargetFailure,
  loadTargetsListSuccess,
  loadTargetsListFailure
}
