import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiUrls} from "../../shared/constants/ApiUrls";
import {Goal, GoalApiResponse} from "../../core/models";

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  constructor(private http: HttpClient) { }

  getAllGoals() {
    return this.http.get<Goal[]>(ApiUrls.GOALS);
  }

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
}
