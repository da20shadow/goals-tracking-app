import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendaRoutingModule } from './agenda-routing.module';
import { AgendaComponent } from './ui/agenda/agenda.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";


@NgModule({
  declarations: [
    AgendaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    AgendaRoutingModule
  ]
})
export class AgendaModule { }
