import {Component, Input} from "@angular/core";
import {Point} from "./models/point";
import {getPathCommandsForLine} from "./utils";

@Component({
  selector: "svg:g[app-line-chart-line]",
  template: `
    <svg:path [attr.d]="d" />
  `,
  styles: [
    `
      path {
        stroke: #51beff;
        fill: none;
      }
    `
  ]
})
export class LineChartLineComponent {
  d: string = "";

  @Input() set points(points: Point[]) {
    this.d = getPathCommandsForLine(points);
  }
}
