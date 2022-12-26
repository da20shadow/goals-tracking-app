import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DateFn {

  dateToInputDate(date: any){
    let inputDate;
    if (date){
      inputDate = new Date(date);
    }else {
      inputDate = new Date();
    }
    const year = inputDate.getFullYear(),
      month = inputDate.getMonth() + 1,
      day = inputDate.getDate();
    return `${year}-${month}-${day}`;
  }

}
