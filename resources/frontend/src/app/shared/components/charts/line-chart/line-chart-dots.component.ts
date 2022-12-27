import {Component, Input} from "@angular/core";
import {Point} from "./models/point";

@Component({
  selector: "svg:g[app-line-chart-dots]",
  template: `
    <svg:circle
      mat-raised-button
      *ngFor="let point of points"
      [attr.cx]="point.x"
      [attr.cy]="point.y"
      [matTooltip]="point.tooltip"
    />
  `,
  styles: [
    `
      circle {
        r: 4px;
        fill: #51beff;
        opacity: 0.5;
        transition: opacity 350ms;
        outline: none;
      }
      circle:hover {
        r: 5px;
        opacity: 1;
      }
    `
  ]
})
export class LineChartDotsComponent {
  @Input() points!: Point[];
}
