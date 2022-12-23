import {UserReducer, UserState} from "./user-store/user.reducer";
import {ActionReducerMap, createFeatureSelector, MetaReducer, StoreModule} from "@ngrx/store";
import {NgModule} from "@angular/core";
import {GoalsListState, GoalsReducer} from "./goals-store/goals.reducer";
import {TargetReducer, TargetState} from "./tartgets-store/target.reducer";
import {TaskReducer, TasksState} from "./task-store/task.reducer";
import {AgendaReducer, AgendaState} from "./agenda-store/agenda.reducer";

const APP_FEATURE_KEY = 'appState'

/** States */
export interface AppState {
  userState: UserState,
  goalsState: GoalsListState,
  targetsState: TargetState,
  tasksState: TasksState,
  agendaState: AgendaState
}

/** Reducers */
const reducers : ActionReducerMap<AppState> = {
  userState: UserReducer,
  goalsState: GoalsReducer,
  targetsState: TargetReducer,
  tasksState: TaskReducer,
  agendaState: AgendaReducer,
}

const metaReducers: MetaReducer<AppState>[] = [];

/** Feature Selector */
export const selectAppState = createFeatureSelector<AppState>(APP_FEATURE_KEY);

/** Module */
@NgModule({
  imports: [StoreModule.forFeature(APP_FEATURE_KEY,reducers,{metaReducers})]
})
export class AppStateModule{}
