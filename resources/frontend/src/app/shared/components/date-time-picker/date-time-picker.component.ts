import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {DayHoursAndMinutes} from "../../constants/DayHoursAndMinutes";

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss']
})
export class DateTimePickerComponent {

  @Input() defaultDate: string | undefined | null;
  @Output() dateValueOutput = new EventEmitter();
  @ViewChild('date') dateInput!: ElementRef;
  @ViewChild('time') timeInput!: ElementRef;
  times: any[] = DayHoursAndMinutes;
  pickedDate: string = '';

  ngAfterViewInit() {
    let date;
    if (this.defaultDate) {
      date = new Date(this.defaultDate);

      const day = date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate();
      const month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      const year = date.getFullYear();

      const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
      const min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

      this.dateInput.nativeElement.value = `${year}-${month}-${day}`;
      this.timeInput.nativeElement.value = `${hour}:${min}`;
    }
  }

  editDate(date: string, time: string) {
    console.log('EditDate')
    if (!date) {
    console.log('no Date')
      const today = new Date();
      const day = today.getDate() < 10 ? '0' + (today.getDate()) : today.getDate();
      const month = today.getMonth() < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
      const year = today.getFullYear();
      this.pickedDate = `${year}-${month}-${day} ${time}`;
      this.dateInput.nativeElement.value = `${year}-${month}-${day}`;
      this.dateValueOutput.emit(this.pickedDate);
      return;
    }
    this.pickedDate = `${date} ${time}`;
    this.dateValueOutput.emit(this.pickedDate);
  }

}
