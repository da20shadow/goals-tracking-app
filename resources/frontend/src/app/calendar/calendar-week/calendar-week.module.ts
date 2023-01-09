import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarWeekRoutingModule } from './calendar-week-routing.module';
import { CalendarWeekComponent } from './calendar-week.component';
import {SharedModule} from "../../shared/components/shared.module";


@NgModule({
  declarations: [
    CalendarWeekComponent
  ],
  imports: [
    CommonModule,
    CalendarWeekRoutingModule,
    SharedModule
  ]
})
export class CalendarWeekModule { }
