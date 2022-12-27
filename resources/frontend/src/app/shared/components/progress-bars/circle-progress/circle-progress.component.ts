import {Component, Input} from '@angular/core';
import {ChartType} from "../../../enums/ChartType";

@Component({
  selector: 'app-circle-progress',
  templateUrl: './circle-progress.component.html',
  styleUrls: ['./circle-progress.component.scss']
})
export class CircleProgressComponent {

  niceColors: any[] = [
    {orange: '#9F5415BE'},
    {green: '#0A3F3DA3'},
  ]

  @Input() progress: number = 10;
  @Input() borderPx: number = 15;
  @Input() color: string = '#9F5415BE';
  @Input() toFixedValue: number = 0;
  @Input() chartType?: ChartType = ChartType.ANIMATED_NO_ROUND;

}
