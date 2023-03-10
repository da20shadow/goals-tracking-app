import {Goal} from "../../core/models";
import {createReducer, on} from "@ngrx/store";
import {GoalPageActions} from "./goal-page.actions";
import {GoalsAPIActions} from "./goal-api.actions";

export interface GoalsListState {
  goals: Goal[];
  activeGoal: Goal|null;
  error: string|null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

const initialState: GoalsListState = {
  goals: [],
  activeGoal: null,
  error: null,
  status: 'pending',
}

export const GoalsReducer = createReducer(
  initialState,
  on(GoalPageActions.clear,() => initialState),
  on(GoalPageActions.loadGoals, (state) => {
    return ({
      ...state,
      status: 'loading'
    })
  }),
  on(GoalsAPIActions.loadGoalsSuccess, (state, {goals}) => {
    if (!goals){goals=[]}
    return ({
      ...state,
      goals: goals,
      error: null,
      status: 'success'
    })
  }),
  on(GoalsAPIActions.loadGoalsFailure, (state,{error})=>{
    return ({
      ...state,
      status: 'error',
      error
    })
  }),
  on(GoalPageActions.setActiveGoal, (state, {goalId}) => {
    //TODO: maybe have to remove it because is useless now!
    const goal = state.goals.find(g => g.id === goalId);
    if (!goal){return state;}
    return ({
      ...state,
      activeGoal: goal
    })
  }),
  on(GoalsAPIActions.setActiveGoalSuccess, (state, {goal}) => {
    return ({...state, activeGoal: goal})
  }),
  on(GoalsAPIActions.setActiveGoalFailure, (state, {error}) => {
    return ({...state, error})
  }),
  on(GoalsAPIActions.addNewGoalSuccess, (state, {goal}) => {
    return state.goals
      ? ({...state,goals: [goal,...state.goals],status:'success'})
      :  state;
  }),
  on(GoalsAPIActions.addNewGoalFailure, (state, {error}) => {
    return ({
      ...state,
      error,
    })
  }),
  on(GoalsAPIActions.removeActiveGoalSuccess, (state, {goalId}) => {
    if (state.goals.length === 1){
      return ({
        ...state,
        goals: state.goals.filter(g => g.id !== goalId),
        activeGoal: null,
        status: 'pending'
      })
    }
    return ({
      ...state,
      goals: state.goals.filter(g => g.id !== goalId),
      activeGoal: null
    })
  }),
  on(GoalsAPIActions.updateActiveGoalSuccess, (state, {goal}) => {
    return ({
      ...state,
      activeGoal: goal
    })
  }),
  on(GoalsAPIActions.updateActiveGoalFailure, (state,{error})=> {
    return ({...state,error})
  }),
  on(GoalPageActions.goalTargetCompleted, (state)=> {
    if (!state.activeGoal){return state;}
    let progress = (state.activeGoal.totalCompletedTargets / state.activeGoal.totalTargets) * 100;
    return ({...state, activeGoal: {...state.activeGoal,progress}})
  }),
  on(GoalPageActions.goalTargetDeleted, (state)=> {
    if (!state.activeGoal){return state;}
    //TODO: not works now to make it works correctly!
    let progress = (state.activeGoal.totalCompletedTargets / state.activeGoal.totalTargets) * 100;
    return ({...state, activeGoal: {...state.activeGoal,progress}})
  }),

)
