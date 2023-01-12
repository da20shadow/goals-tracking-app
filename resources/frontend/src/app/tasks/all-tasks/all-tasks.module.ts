import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllTasksRoutingModule } from './all-tasks-routing.module';
import {AllTasksComponent} from "./all-tasks.component";
import {TasksListModule} from "../../shared/components/tasks-list/tasks-list.module";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    AllTasksComponent
  ],
  imports: [
    CommonModule,
    TasksListModule,
    AllTasksRoutingModule,
    SharedModule
  ]
})
export class AllTasksModule { }
