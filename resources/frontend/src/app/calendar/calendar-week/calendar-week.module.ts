import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarWeekRoutingModule } from './calendar-week-routing.module';
import { CalendarWeekComponent } from './calendar-week.component';
import {SharedModule} from "../../shared/shared.module";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    CalendarWeekComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    CalendarWeekRoutingModule,
    SharedModule
  ]
})
export class CalendarWeekModule { }
