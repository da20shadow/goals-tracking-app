import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AgendaComponent} from "./ui/agenda.component";

const routes: Routes = [
  {path: '', component: AgendaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaRoutingModule { }
