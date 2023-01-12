import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CalendarRoutingModule} from './calendar-routing.module';
import {CalendarComponent} from './ui/calendar/calendar.component';
import {MatIconModule} from "@angular/material/icon";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    CalendarComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    CalendarRoutingModule,
    SharedModule
  ]
})
export class CalendarModule {
}
