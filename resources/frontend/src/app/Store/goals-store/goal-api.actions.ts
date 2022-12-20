import {createAction, props} from "@ngrx/store";
import {Goal} from "../../core/models";

const loadGoalsSuccess = createAction('[GOALS LIST PAGE] Load Goals Success',props<{goals: Goal[]}>());
const loadGoalsFailure = createAction('[GOALS LIST PAGE] Load Goals Error',props<{error: string}>());

const addNewGoalSuccess = createAction('[GOALS LIST PAGE] Add Goal Success', props<{ goal: Goal }>());
const addNewGoalFailure = createAction('[GOALS LIST PAGE] Add Goal Success', props<{ error: string }>());

const updateActiveGoalSuccess = createAction('[GOAL DETAILS PAGE] Edit Active Goal Success', props<{ goal: Goal }>());
const updateActiveGoalFailure = createAction('[GOAL DETAILS PAGE] Edit Active Goal Success', props<{ error: string}>());
const removeActiveGoalSuccess = createAction('[GOAL DETAILS PAGE] Delete Active Goal Success', props<{ goalId: number }>());

const setActiveGoalSuccess = createAction('[GOAL DETAILS PAGE] Set Active Goal Success', props<{ goal: Goal }>());
const setActiveGoalFailure = createAction('[GOAL DETAILS PAGE] Set Active Goal Success', props<{ error: string }>());


export const GoalsAPIActions = {
  loadGoalsSuccess,
  loadGoalsFailure,
  addNewGoalSuccess,
  addNewGoalFailure,
  updateActiveGoalSuccess,
  updateActiveGoalFailure,
  removeActiveGoalSuccess,
  setActiveGoalSuccess,
  setActiveGoalFailure,
}
