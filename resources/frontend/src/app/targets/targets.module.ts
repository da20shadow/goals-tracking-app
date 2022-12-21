import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TargetsRoutingModule } from './targets-routing.module';
import {HttpClientModule} from "@angular/common/http";
import { TargetDetailsComponent } from './target-details/target-details.component';
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";


@NgModule({
  declarations: [
    TargetDetailsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    TargetsRoutingModule,
    SharedModule
  ]
})
export class TargetsModule { }
