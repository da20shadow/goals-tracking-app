import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TasksListComponent} from "./tasks-list.component";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatSortModule} from "@angular/material/sort";
import {MatTooltipModule} from "@angular/material/tooltip";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AddTaskModalComponent} from './add-task-modal/add-task-modal.component';
import {ViewTaskModalComponent} from './view-task-modal/view-task-modal.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {RichTextEditorModule} from "../rich-text-editor/rich-text-editor.module";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

@NgModule({
  declarations: [
    TasksListComponent,
    AddTaskModalComponent,
    ViewTaskModalComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatSortModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    RouterModule,
    FormsModule,
    RichTextEditorModule,
  ],
  providers:[MatDatepickerModule],
  exports: [TasksListComponent]
})
export class TasksListModule {
}
