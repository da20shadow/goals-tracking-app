import {createAction, props} from "@ngrx/store";
import {Goal} from "../../core/models";

const get = createAction('[GOALS LIST PAGE] Get Goals');
const getActiveGoal = createAction('[GOALS LIST PAGE] Get Active Goal',props<{goalId: number}>());
const loadGoals = createAction('[GOALS LIST PAGE] Load Goals');
const loadActiveGoal = createAction('[GOALS LIST PAGE] Load Active Goal',props<{goalId: number}>());
const addNewGoal = createAction('[GOALS LIST PAGE] Add Goal', props<{ goal: Goal }>());


const setActiveGoal = createAction('[GOAL DETAILS PAGE] Set Active Goal',props<{goalId:number}>());
const updateActiveGoal = createAction('[GOAL DETAILS PAGE] Update Active Goal', props<{ goalId: number, changedGoal: Goal }>());
const removeActiveGoal = createAction('[GOAL DETAILS PAGE] Delete Active Goal', props<{ goalId: number }>());

const goalTargetCompleted = createAction('[GOAL DETAILS PAGE] Goal Target Completed');
const goalTargetDeleted = createAction('[GOAL DETAILS PAGE] Goal Target Deleted');


export const GoalPageActions = {
  get,
  getActiveGoal,
  loadGoals,
  loadActiveGoal,
  addNewGoal,
  setActiveGoal,
  updateActiveGoal,
  removeActiveGoal,
  goalTargetCompleted,
  goalTargetDeleted
}
