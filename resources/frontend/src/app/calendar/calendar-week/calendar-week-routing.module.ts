import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CalendarWeekComponent} from "./calendar-week.component";

const routes: Routes = [
  {path: '', component: CalendarWeekComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarWeekRoutingModule { }
