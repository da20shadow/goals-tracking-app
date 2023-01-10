import {Component} from '@angular/core';
import {DayHours} from "../../shared/constants/DayHours";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {agendaSelectors} from "../../Store/agenda-store/agenda-selectors";
import {AgendaPageActions} from "../../Store/agenda-store/agenda-page.actions";
import {Task} from 'src/app/core/models';
import {ViewTaskModalComponent} from "../../shared/components/tasks-list/view-task-modal/view-task-modal.component";
import {ModalService} from "../../core/services/modal.service";

@Component({
  selector: 'app-calendar-week',
  templateUrl: './calendar-week.component.html',
  styleUrls: ['./calendar-week.component.scss']
})
export class CalendarWeekComponent {
  todayTasks$: Observable<Task[]>;
  nextTasks$: Observable<Task[]>;
  secondDay: Task[] = [];
  thirdDay: Task[] = [];
  fourthDay: Task[] = [];
  fifthDay: Task[] = [];
  sixthDay: Task[] = [];
  seventhDay: Task[] = [];
  times = DayHours;
  interval: any;
  hourNow!: string;
  lineTopPx!: string;
  today = new Date();
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  constructor(private store$: Store,private modalService: ModalService) {
    this.store$.dispatch(AgendaPageActions.getTodayTasks());
    this.store$.dispatch(AgendaPageActions.getNextTasks());
    this.todayTasks$ = this.store$.select(agendaSelectors.selectTodayTasks);
    this.nextTasks$ = this.store$.select(agendaSelectors.selectNextTasks);

    this.hourNow = `${this.today.getHours()}:${String(this.today.getMinutes()).padStart(2, "0")}`
    this.lineTopPx = `${(this.today.getHours() * 60) + this.today.getMinutes()}px`;

    const secondsRemaining = (60 - this.today.getSeconds()) * 1000;

    setTimeout(() => {
      this.interval = setInterval(() => {
        this.hourNow = `${this.today.getHours()}:${String(this.today.getMinutes()).padStart(2, "0")}`
        this.lineTopPx = `${(this.today.getHours() * 60) + this.today.getMinutes()}px`;
      },60 *1000)

    }, secondsRemaining);
  }

  ngOnInit(){
    this.nextTasks$.subscribe(tasks => {
      tasks.map(t => {
        if (t.start_date){
          const taskDate = new Date(t.start_date);
          if (this.today.getDate() + 1 === taskDate.getDate() && this.today.getMonth() === taskDate.getMonth()
            && this.today.getFullYear() === taskDate.getFullYear()){
            this.secondDay.push(t);
          }else if (this.today.getDate() + 2 === taskDate.getDate() && this.today.getMonth() === taskDate.getMonth()
            && this.today.getFullYear() === taskDate.getFullYear()){
            this.thirdDay.push(t);
          }else if (this.today.getDate() + 3 === taskDate.getDate() && this.today.getMonth() === taskDate.getMonth()
            && this.today.getFullYear() === taskDate.getFullYear()){
            this.fourthDay.push(t);
          }else if (this.today.getDate() + 4 === taskDate.getDate() && this.today.getMonth() === taskDate.getMonth()
            && this.today.getFullYear() === taskDate.getFullYear()){
            this.fifthDay.push(t);
          }else if (this.today.getDate() + 5 === taskDate.getDate() && this.today.getMonth() === taskDate.getMonth()
            && this.today.getFullYear() === taskDate.getFullYear()){
            this.sixthDay.push(t);
          }else if (this.today.getDate() + 6 === taskDate.getDate() && this.today.getMonth() === taskDate.getMonth()
            && this.today.getFullYear() === taskDate.getFullYear()){
            this.seventhDay.push(t);
          }
        }
      })
    });

  }

  calculateTopPx(task: Task) {
    if (task.start_date){
      const startDate = new Date(task.start_date);
      return (startDate.getHours() * 60) + startDate.getMinutes();
    }
    return null;
  }

  calculateTaskHeight(task: Task) {
    if (task.start_date && task.end_date){
      const startDate = new Date(task.start_date);
      const startPx = (startDate.getHours() * 60) + startDate.getMinutes();
      const endDate = new Date(task.end_date);
      const endPx = (endDate.getHours() * 60) + endDate.getMinutes();
      return (endPx - startPx);
    }
    return null;
  }

  openViewTaskModal(task: Task) {
    this.modalService.openFormModal(ViewTaskModalComponent,{task})
  }

  getDayName(day: number) {
    console.log('day',day)
    if  (day === 7){
      return 0;
    }else if (day > 7){
      day -= 7;
    }
    return day;
  }

  getDateAndMonth(dateOfMonth: number, plusDays: number) {
    const date = new Date(), y = date.getFullYear(), m = date.getMonth();
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);

    if (dateOfMonth + plusDays > lastDay.getDate()){
      const date = new Date(this.today.getFullYear(),this.today.getMonth() + 2, plusDays);
      const diff = (dateOfMonth + plusDays) - lastDay.getDate();
      if (diff <= 7){
        return `${diff} ${this.months[date.getMonth()]}`
      }
    }
    return `${date.getDate() + plusDays} ${this.months[date.getMonth()]}`
  }
}
