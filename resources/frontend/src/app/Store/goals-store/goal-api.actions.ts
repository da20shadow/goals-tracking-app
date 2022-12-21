import {createAction, props} from "@ngrx/store";
import {Goal} from "../../core/models";

const loadGoalsSuccess = createAction('[GOALS LIST API] Load Goals Success',props<{goals: Goal[]}>());
const loadGoalsFailure = createAction('[GOALS LIST API] Load Goals Failure',props<{error: string}>());

const addNewGoalSuccess = createAction('[GOALS LIST API] Add Goal Success', props<{ goal: Goal }>());
const addNewGoalFailure = createAction('[GOALS LIST API] Add Goal Failure', props<{ error: string }>());

const updateActiveGoalSuccess = createAction('[GOAL DETAILS API] Update Active Goal Success', props<{ goal: Goal }>());
const updateActiveGoalFailure = createAction('[GOAL DETAILS API] Update Active Goal Failure', props<{ error: string}>());
const removeActiveGoalSuccess = createAction('[GOAL DETAILS API] Delete Active Goal Success', props<{ goalId: number }>());

const setActiveGoalSuccess = createAction('[GOAL DETAILS API] Set Active Goal Success', props<{ goal: Goal }>());
const setActiveGoalFailure = createAction('[GOAL DETAILS API] Set Active Goal Failure', props<{ error: string }>());


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
