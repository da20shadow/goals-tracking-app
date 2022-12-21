import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TargetDetailsComponent} from "./target-details/target-details.component";

const routes: Routes = [
  {path: ':id',component:TargetDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TargetsRoutingModule { }
