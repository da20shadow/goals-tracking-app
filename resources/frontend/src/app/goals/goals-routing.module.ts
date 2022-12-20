import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GoalsListComponent} from "./goals-list/goals-list.component";
import {GoalDetailsComponent} from "./goal-details/goal-details.component";

const routes: Routes = [
  {path: '', component: GoalsListComponent},
  {path: ':id', component: GoalDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoalsRoutingModule { }
