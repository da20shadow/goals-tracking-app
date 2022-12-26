import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendaRoutingModule } from './agenda-routing.module';
import { AgendaComponent } from './ui/agenda.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {SharedModule} from "../shared/components/shared.module";
import { CalendarComponent } from './calendar/calendar.component';


@NgModule({
  declarations: [
    AgendaComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    AgendaRoutingModule,
    SharedModule,
  ]
})
export class AgendaModule { }
