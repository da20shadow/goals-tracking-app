import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CalendarComponent} from "./ui/calendar/calendar.component";

const routes: Routes = [
  {path: '', component: CalendarComponent},
  {path: 'week', loadChildren: () =>
      import('./calendar-week/calendar-week.module').then(m => m.CalendarWeekModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
