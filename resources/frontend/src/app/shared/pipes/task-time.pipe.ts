import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskTime'
})
export class TaskTimePipe implements PipeTransform {

  transform(startDate: string|null, endDate: string|null): string {

    if (startDate && endDate){
      const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      const start = new Date(startDate);
      const today = new Date();
      const end = new Date(endDate);

      if (today.getDate() !== start.getDate() && today.getMonth() === start.getMonth()
        && today.getFullYear() === start.getUTCFullYear()){
        if (today.getDate() - 1 === start.getDate()){
          return `Yesterday ${this.getTime(start)} - Today ${this.getTime(end)}`;
        }
        return `${start.getDate()} ${monthNames[start.getMonth()]} ${this.getTime(start)} - Today ${this.getTime(end)}`;
      }

      if (start.getDate() + 1 === end.getDate()){
        return `Today ${this.getTime(start)} - Tomorrow ${this.getTime(end)}`;
      }else if (start.getDate() < end.getDate()){

        let day = weekday[end.getDay()];
        return `Today ${this.getTime(start)} - ${day}, ${this.getTime(end)}`;
      }
      return `Today ${this.getTime(start)} - ${this.getTime(end)}`;
    }

    if (startDate){
      const start = new Date(startDate);
      return `Today ${this.getTime(start)} -`;
    }

    if (endDate){
      const end = new Date(endDate);
      return `Today - ${this.getTime(end)}`;
    }
    return '';
  }

  getTime(date: any){
    const hour = date.getHours();
    const min = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes();
    return `${hour}:${min}`;
  }

}
