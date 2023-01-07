import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskTime'
})
export class TaskTimePipe implements PipeTransform {

  transform(startDate: string|null, endDate: string|null): string {

    if (startDate && endDate){
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (start.getDate() + 1 === end.getDate()){
        return `Today ${this.getTime(start)} - Tomorrow ${this.getTime(end)}`;
      }else if (start.getDate() < end.getDate()){
        const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
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
    const hour = date.getHours() < 10 ? '0'+date.getHours() : date.getHours();
    const min = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes();
    return `${hour}:${min}`;
  }

}
