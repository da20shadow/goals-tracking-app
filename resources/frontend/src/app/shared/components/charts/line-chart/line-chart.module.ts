import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineChartComponent } from './line-chart.component';
import {LineChartLineComponent} from "./line-chart-line.component";
import {LineChartDotsComponent} from "./line-chart-dots.component";
import {LineChartAreaComponent} from "./line-chart-area.component";
import {MatTooltipModule} from "@angular/material/tooltip";



@NgModule({
  declarations: [
    LineChartComponent,
    LineChartLineComponent,
    LineChartDotsComponent,
    LineChartAreaComponent
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
  ],
  exports:[LineChartComponent]
})
export class LineChartModule { }
