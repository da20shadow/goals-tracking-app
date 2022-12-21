import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiUrls} from "../../shared/constants/ApiUrls";
import {Goal, GoalApiResponse, Target} from "../../core/models";

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  constructor(private http: HttpClient) { }

  saveGoal(goal: Goal) {
    return this.http.post<GoalApiResponse>(ApiUrls.GOAL_ADD,goal);
  }

  updateGoal(goalId: number, changedGoal: Goal) {
    return this.http.patch<GoalApiResponse>(ApiUrls.GOAL_UPDATE+`/${goalId}`,changedGoal);
  }

  deleteGoal(goalId: number) {
    return this.http.delete<GoalApiResponse>(ApiUrls.GOAL_DELETE+ `/${goalId}`);
  }

  getGoalById(goalId: number) {
    return this.http.get<Goal>(ApiUrls.GOALS + `/${goalId}`);
  }

  getAllGoals() {
    return this.http.get<Goal[]>(ApiUrls.GOALS);
  }

  getGoalTargets(goalId: number){
    return this.http.get<Target[]>(ApiUrls.GOAL_TARGETS+`/${goalId}`);
  }
}
