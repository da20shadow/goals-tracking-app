import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TasksRoutingModule} from './tasks-routing.module';
import {TaskDetailsComponent} from './task-details/task-details.component';
import {SharedModule} from "../shared/components/shared.module";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";


@NgModule({
  declarations: [
    TaskDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    TasksRoutingModule,
    SharedModule
  ]
})
export class TasksModule {
}
