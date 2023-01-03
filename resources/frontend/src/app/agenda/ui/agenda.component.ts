import {Component, ElementRef, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import { Task } from 'src/app/core/models';
import {Store} from "@ngrx/store";
import {agendaSelectors} from "../../Store/agenda-store/agenda-selectors";
import {AgendaPageActions} from "../../Store/agenda-store/agenda-page.actions";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ModalService} from "../../core/services/modal.service";
import {AddTaskModalComponent} from "../../shared/components/tasks-list/add-task-modal/add-task-modal.component";
import {ViewTaskModalComponent} from "../../shared/components/tasks-list/view-task-modal/view-task-modal.component";

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

  todayTasks$: Observable<Task[]>;
  overdueTasks$: Observable<Task[]>;
  showOverdueTasks: boolean = false;
  nextTasks$: Observable<Task[]>;
  showNextTasks: boolean = false;
  unscheduledTasks$: Observable<Task[]>;
  showUnscheduledTasks: boolean = false;

  today: any = new Date();
  interval: any;
  hourNow!: string;
  lineTopPx!: string;
  @ViewChild('calendarView') calendarView!: ElementRef;
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
    this.overdueTasks$ = this.store$.select(agendaSelectors.selectOverdueTasks);
    this.nextTasks$ = this.store$.select(agendaSelectors.selectNextTasks);
    this.unscheduledTasks$ = this.store$.select(agendaSelectors.selectUnscheduledTasks);
  }

  ngOnInit(){
    this.store$.dispatch(AgendaPageActions.getTodayTasks());
    this.store$.dispatch(AgendaPageActions.getOverdueTasks());
    this.store$.dispatch(AgendaPageActions.getNextTasks());
    this.store$.dispatch(AgendaPageActions.getUnscheduledTasks());

    let date = new Date();
    this.hourNow = `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`
    this.lineTopPx = `${(date.getHours() * 60) + date.getMinutes()}px`;

    this.interval = setInterval(() => {
      date = new Date();
      this.hourNow = `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`
      this.lineTopPx = `${(date.getHours() * 60) + date.getMinutes()}px`;
    },1000)
  }

  ngAfterViewInit(){
    let date = new Date();
    this.calendarView.nativeElement.scrollTop = (date.getHours() * 60) + date.getMinutes();
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

  getOverdueTasks(){
    this.store$.dispatch(AgendaPageActions.getOverdueTasks());
    console.log('Called Load overdue tasks')
  }

  getNextTasks(){
    console.log('Called Load Next tasks')
    this.store$.dispatch(AgendaPageActions.getNextTasks());
  }

  getUnscheduledTasks(){
    console.log('Called Load Unscheduled tasks')
    this.store$.dispatch(AgendaPageActions.getUnscheduledTasks());
  }

  openViewTaskModal(task: Task) {
    this.modalService.openFormModal(ViewTaskModalComponent,{task})
  }

  logScroll(scrollTop: number) {
    console.log(scrollTop)
  }
}
