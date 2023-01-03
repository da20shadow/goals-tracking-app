import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UrgentTasksComponent} from "./urgent-tasks.component";

const routes: Routes = [
  {path:'',component:UrgentTasksComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UrgentTasksRoutingModule { }
