import {UserReducer, UserState} from "./user-store/user.reducer";
import {ActionReducerMap, createFeatureSelector, MetaReducer, StoreModule} from "@ngrx/store";
import {NgModule} from "@angular/core";

const APP_FEATURE_KEY = 'appState'

/** States */
export interface AppState {
  userState: UserState
}

/** Reducers */
const reducers : ActionReducerMap<AppState> = {
  userState: UserReducer,
}

const metaReducers: MetaReducer<AppState>[] = [];

/** Feature Selector */
export const selectAppState = createFeatureSelector<AppState>(APP_FEATURE_KEY);

/** Module */
@NgModule({
  imports: [StoreModule.forFeature(APP_FEATURE_KEY,reducers,{metaReducers})]
})
export class AppStateModule{}
