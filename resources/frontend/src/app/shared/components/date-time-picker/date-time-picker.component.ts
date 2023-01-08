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
    if (this.defaultDate) {
      const date = new Date(this.defaultDate);

      const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
      const min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

      this.dateInput.nativeElement.value = `${this.dateToString(date)}`;
      this.timeInput.nativeElement.value = `${hour}:${min}`;
    }
  }

  editDate(date: string, time: string) {
    if (!date) {
      const stringDate = this.dateToString(date);
      this.pickedDate = `${stringDate} ${time}`;
      this.dateInput.nativeElement.value = `${stringDate}`;
      this.dateValueOutput.emit(this.pickedDate);
      return;
    }
    this.pickedDate = `${date} ${time}`;
    this.dateValueOutput.emit(this.pickedDate);
  }

  dateToString(date: any){
    const day = date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate();
    const month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

}
