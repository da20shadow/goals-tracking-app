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
      return null;
    }
    const year = inputDate.getFullYear(),
      month = inputDate.getMonth() < 9 ? '0' + (inputDate.getMonth() + 1) : inputDate.getMonth() + 1,
      day = inputDate.getDate() < 9 ? '0' + inputDate.getDate() : inputDate.getDate();
    return `${year}-${month}-${day}`;
  }

}
