import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageTitleComponent} from './components/page-title/page-title.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatSortModule} from "@angular/material/sort";
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    PageTitleComponent,
    TasksListComponent,
    PieChartComponent,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatSortModule,
    MatTooltipModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
    PageTitleComponent,
    TasksListComponent,
    PieChartComponent,
  ],
})
export class SharedModule {
}
