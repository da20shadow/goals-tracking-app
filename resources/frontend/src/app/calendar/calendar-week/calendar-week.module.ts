import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarWeekRoutingModule } from './calendar-week-routing.module';
import { CalendarWeekComponent } from './calendar-week.component';


@NgModule({
  declarations: [
    CalendarWeekComponent
  ],
  imports: [
    CommonModule,
    CalendarWeekRoutingModule
  ]
})
export class CalendarWeekModule { }
