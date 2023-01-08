import { Component } from '@angular/core';
import {DayHours} from "../../shared/constants/DayHours";

@Component({
  selector: 'app-calendar-week',
  templateUrl: './calendar-week.component.html',
  styleUrls: ['./calendar-week.component.scss']
})
export class CalendarWeekComponent {
  times = DayHours;
  interval: any;
  hourNow!: string;
  lineTopPx!: string;

  constructor() {
    let date = new Date();
    this.hourNow = `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`
    this.lineTopPx = `${(date.getHours() * 60) + date.getMinutes()}px`;

    const secondsRemaining = (60 - date.getSeconds()) * 1000;

    setTimeout(() => {

      this.interval = setInterval(() => {
        date = new Date();
        this.hourNow = `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`
        this.lineTopPx = `${(date.getHours() * 60) + date.getMinutes()}px`;
      },60 *1000)

    }, secondsRemaining);
  }
}
