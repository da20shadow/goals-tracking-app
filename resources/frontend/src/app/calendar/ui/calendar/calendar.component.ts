import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  currentMonth: string;
  monthDays: any = [];
  prevMonthLastDays: any = [];
  nextMonthFirstDays: any = [];

  constructor() {
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    let date = new Date(),
      firstDayOfTheCurrentMonth = new Date(date.getFullYear(),date.getMonth(), 1).getDay(),
      lastDayOfCurrentMonth = new Date(date.getFullYear(),date.getMonth() + 1,0).getDate();

    this.currentMonth = months[date.getMonth()];

    const previewsMonthLastDay = date.getMonth() === 0
      ? new Date(date.getFullYear() - 1,12, 0).getDate()
      : new Date(date.getFullYear(), date.getMonth(),0).getDate();

    firstDayOfTheCurrentMonth = firstDayOfTheCurrentMonth === 0 ? 7 : firstDayOfTheCurrentMonth
    if (firstDayOfTheCurrentMonth > 1){
      const prevMonthDays = previewsMonthLastDay - (firstDayOfTheCurrentMonth - 1);
      for (let i = previewsMonthLastDay; i > prevMonthDays; i--) {
        this.prevMonthLastDays.unshift(i);
      }
    }

    for (let i = 1; i < lastDayOfCurrentMonth + 1; i++) {
      this.monthDays.push(i);
    }

    const filledBoxes = this.prevMonthLastDays.length + this.monthDays.length;
    if (filledBoxes > 35){
      const availableBoxes = 42 - filledBoxes;
      for (let i = 1; i <= availableBoxes; i++) {
        this.nextMonthFirstDays.push(i)
      }
    }
  }
}
