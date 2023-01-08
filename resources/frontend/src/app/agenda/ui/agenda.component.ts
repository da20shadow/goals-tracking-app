import {Component, ElementRef, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {Task, TaskPriority} from 'src/app/core/models';
import {Store} from "@ngrx/store";
import {agendaSelectors} from "../../Store/agenda-store/agenda-selectors";
import {AgendaPageActions} from "../../Store/agenda-store/agenda-page.actions";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ModalService} from "../../core/services/modal.service";
import {AddTaskModalComponent} from "../../shared/components/tasks-list/add-task-modal/add-task-modal.component";
import {ViewTaskModalComponent} from "../../shared/components/tasks-list/view-task-modal/view-task-modal.component";
import {TaskAPIActions} from "../../Store/task-store/task-api.actions";
import {TaskService} from "../../tasks/services/task.service";
import {NotificationService} from "../../core/services/notification.service";
import {AgendaAPIActions} from "../../Store/agenda-store/agenda-api.actions";
import {DayHours} from "../../shared/constants/DayHours";

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
  times = DayHours;

  constructor(private taskService: TaskService,private store$: Store, private modalService: ModalService,private notificationService: NotificationService) {
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

    const secondsRemaining = (60 - date.getSeconds()) * 1000;

    setTimeout(() => {

      this.interval = setInterval(() => {
        date = new Date();
        this.hourNow = `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`
        this.lineTopPx = `${(date.getHours() * 60) + date.getMinutes()}px`;
      },60 *1000)

    }, secondsRemaining);

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
      const taskForm = result.data && result.data.taskForm && result.data.taskForm.value ? result.data.taskForm.value : null;
      if (taskForm){
        let task = {};
        task = {...task,title: taskForm.title}
        //TODO: optimize the code make this reusable in separate file!
        if (taskForm.priority !== ""){task = {...task,priority: taskForm.priority}}
        if (taskForm.status !== ""){task = {...task,status: taskForm.status}}
        if (taskForm.start_date !== ""){task = {...task,start_date: taskForm.start_date}}
        if (taskForm.end_date !== ""){task = {...task,end_date: taskForm.end_date}}

        this.taskService.saveTask(task).subscribe({
          next: (response) => {
            this.notificationService.showSuccessNotification(response.message);
            const task = response.task;
            console.log('response.task:',task)
            let startDate;
            if (task.start_date){startDate = new Date(task.start_date);}
            let endDate;
            if (task.end_date){endDate = new Date(task.end_date);}
            const today = new Date();
            if (startDate && startDate.getDate() === today.getDate() && startDate.getMonth() === today.getMonth() && startDate.getFullYear() === today.getFullYear()
              || endDate && endDate.getDate() === today.getDate() && endDate.getMonth() === today.getMonth() && endDate.getFullYear() === today.getFullYear()){
              this.store$.dispatch(AgendaAPIActions.addTodayTaskSuccess({task}));
              if (task.priority === TaskPriority.URGENT){
                this.store$.dispatch(TaskAPIActions.addUrgentTaskSuccess({task}))
              }
            }
          },
          error: (err) => this.notificationService.showErrorNotification(err.error.message)
        })
      }
    })
    //TODO: open modal for adding new task with option to select goal and target
  }

  getOverdueTasks(){
    this.store$.dispatch(AgendaPageActions.getOverdueTasks());
  }

  getNextTasks(){
    this.store$.dispatch(AgendaPageActions.getNextTasks());
  }

  getUnscheduledTasks(){
    this.store$.dispatch(AgendaPageActions.getUnscheduledTasks());
  }

  openViewTaskModal(task: Task) {
    this.modalService.openFormModal(ViewTaskModalComponent,{task})
  }

  logScroll(scrollTop: number) {
    console.log(scrollTop)
  }

  calculateTopPx(task: Task) {
    if (task.start_date){
      const startDate = new Date(task.start_date);
      return (startDate.getHours() * 60) + startDate.getMinutes();
    }
    return null;
  }
  calculateTaskHeight(task: Task){
    if (task.start_date && task.end_date){
      const startDate = new Date(task.start_date);
      const startPx = (startDate.getHours() * 60) + startDate.getMinutes();
      const endDate = new Date(task.end_date);
      const endPx = (endDate.getHours() * 60) + endDate.getMinutes();
      const height = endPx - startPx;
      const max = 1440 - endPx
      return height >= max ? max : height;
    }
    return null;
  }

  isAllDayTask(task: Task) {
    const startDate = task.start_date ?new Date(task.start_date) : null;
    const endDate = task.end_date ? new Date(task.end_date) : null;

    return !!(startDate && startDate.getHours() === 0 && startDate.getMinutes() === 0
      && endDate && endDate.getHours() === 0 && endDate.getMinutes() === 0);
  }
}
