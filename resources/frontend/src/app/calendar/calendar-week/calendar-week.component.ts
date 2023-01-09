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
  times = DayHours;
  interval: any;
  hourNow!: string;
  lineTopPx!: string;
  todayTasks$: Observable<Task[]>;

  constructor(private store$: Store,private modalService: ModalService) {
    this.store$.dispatch(AgendaPageActions.getTodayTasks());
    this.todayTasks$ = this.store$.select(agendaSelectors.selectTodayTasks);
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
}
