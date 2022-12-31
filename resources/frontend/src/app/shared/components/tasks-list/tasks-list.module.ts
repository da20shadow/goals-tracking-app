import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TasksListComponent} from "./tasks-list.component";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatSortModule} from "@angular/material/sort";
import {MatTooltipModule} from "@angular/material/tooltip";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { AddTaskModalComponent } from './add-task-modal/add-task-modal.component';
import { ViewTaskModalComponent } from './view-task-modal/view-task-modal.component';


@NgModule({
  declarations: [TasksListComponent, AddTaskModalComponent, ViewTaskModalComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatSortModule,
    MatTooltipModule,
    RouterModule,
    FormsModule,
  ],
  exports: [TasksListComponent]
})
export class TasksListModule {
}
