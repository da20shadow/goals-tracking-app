import {createAction, props} from "@ngrx/store";
import {Target} from "../../core/models";

const get = createAction('[TARGET PAGE] Get Goal Targets', props<{goalId: number}>());
const loadTargets = createAction('[TARGET PAGE] Load Targets', props<{goalId: number}>());

const getActiveTarget = createAction('[TARGET PAGE] Get Active Target',props<{targetId:number}>());
const loadActiveTarget = createAction('[TARGET PAGE] Load Active Target',props<{targetId:number}>());

const updateActiveTarget = createAction('[TARGET PAGE] Update Active Target',props<{targetId:number, changedTarget: Target}>());

const getActiveTargetTasks = createAction('[TARGET PAGE] Get Active Target Tasks',props<{targetId: number}>());
const loadActiveTargetTasks = createAction('[TARGET PAGE] Load Active Target Tasks',props<{targetId: number}>());

const deleteActiveTarget = createAction('[TARGET PAGE] Delete Active Target',props<{targetId: number,goalId: number}>());

const clear = createAction('[TARGET PAGE] Clear Targets');


export const TargetPageActions = {
  get,
  loadTargets,
  getActiveTarget,
  loadActiveTarget,
  updateActiveTarget,
  getActiveTargetTasks,
  loadActiveTargetTasks,
  deleteActiveTarget,
  clear
}
