import { Component } from '@angular/core';
import {Observable} from "rxjs";
import { Task } from 'src/app/core/models';
import {Store} from "@ngrx/store";
import {agendaSelectors} from "../../Store/agenda-store/agenda-selectors";
import {AgendaPageActions} from "../../Store/agenda-store/agenda-page.actions";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ModalService} from "../../core/services/modal.service";
import {AddTaskModalComponent} from "../../shared/components/tasks-list/add-task-modal/add-task-modal.component";

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        transform: 'scaleX(0.01)', opacity: 0
      })),
      transition('void <=> *', animate(400)),
    ]),
  ]
})
export class AgendaComponent {

  todayTasks$: Observable<Task[]>

  today: any = new Date();
  interval: any;
  hourNow!: string;
  lineTopPx!: string;
  times = [
    {hour: '00:00'},
    {hour: '01:00'},
    {hour: '02:00'},
    {hour: '03:00'},
    {hour: '04:00'},
    {hour: '05:00'},
    {hour: '06:00'},
    {hour: '07:00'},
    {hour: '08:00'},
    {hour: '09:00'},
    {hour: '10:00'},
    {hour: '11:00'},
    {hour: '12:00'},
    {hour: '13:00'},
    {hour: '14:00'},
    {hour: '15:00'},
    {hour: '16:00'},
    {hour: '17:00'},
    {hour: '18:00'},
    {hour: '19:00'},
    {hour: '20:00'},
    {hour: '21:00'},
    {hour: '22:00'},
    {hour: '23:00'},
  ]

  constructor(private store$: Store, private modalService: ModalService) {
    this.todayTasks$ = this.store$.select(agendaSelectors.selectTodayTasks);
  }

  ngOnInit(){
    this.store$.dispatch(AgendaPageActions.getTodayTasks());
    let date = new Date();
    this.hourNow = `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`
    this.lineTopPx = `${(date.getHours() * 60) + date.getMinutes()}px`;

    this.interval = setInterval(() => {
      date = new Date();
      this.hourNow = `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`
      this.lineTopPx = `${(date.getHours() * 60) + date.getMinutes()}px`;
    },1000)
  }

  ngOnDestroy(){
    if (this.interval){
      clearInterval(this.interval);
    }
  }

  addNewTask(){
    const modalRef = this.modalService.openFormModal(AddTaskModalComponent);
    modalRef.afterClosed().subscribe(result => {
      console.log(result);
      alert('COMING SOON...');
    })
    //TODO: open modal for adding new task with option to select goal and target
  }

}
