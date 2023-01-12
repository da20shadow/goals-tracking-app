import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {GoalsRoutingModule } from './goals-routing.module';
import {GoalsListComponent } from './goals-list/goals-list.component';
import {GoalDetailsComponent } from './goal-details/goal-details.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {AddGoalModalComponent } from './components/add-goal-modal/add-goal-modal.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {TargetsListComponent } from './components/targets-list/targets-list.component';
import {SharedModule} from "../shared/shared.module";
import {CircleProgressModule} from "../shared/components/progress-bars/circle-progress/circle-progress.module";
import {RichTextEditorModule} from "../shared/components/rich-text-editor/rich-text-editor.module";


@NgModule({
  declarations: [
    GoalsListComponent,
    GoalDetailsComponent,
    AddGoalModalComponent,
    TargetsListComponent
  ],
    imports: [
        CommonModule,
        MatDialogModule,
        MatMenuModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        GoalsRoutingModule,
        SharedModule,
        CircleProgressModule,
        RichTextEditorModule,
    ]
})
export class GoalsModule { }
