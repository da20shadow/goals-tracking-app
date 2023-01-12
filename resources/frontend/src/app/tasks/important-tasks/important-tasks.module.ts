import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportantTasksRoutingModule } from './important-tasks-routing.module';
import { ImportantTasksComponent } from './important-tasks.component';
import {SharedModule} from "../../shared/shared.module";
import {TasksListModule} from "../../shared/components/tasks-list/tasks-list.module";


@NgModule({
  declarations: [
    ImportantTasksComponent
  ],
  imports: [
    CommonModule,
    ImportantTasksRoutingModule,
    SharedModule,
    TasksListModule
  ]
})
export class ImportantTasksModule { }
