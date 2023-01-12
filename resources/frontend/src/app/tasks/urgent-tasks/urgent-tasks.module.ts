import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UrgentTasksRoutingModule } from './urgent-tasks-routing.module';
import { UrgentTasksComponent } from './urgent-tasks.component';
import {TasksListModule} from "../../shared/components/tasks-list/tasks-list.module";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    UrgentTasksComponent
  ],
  imports: [
    CommonModule,
    UrgentTasksRoutingModule,
    TasksListModule,
    SharedModule
  ]
})
export class UrgentTasksModule { }
