import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GlobalClasses} from "../../styles/global-classes";
import {Task, TaskPriority, TaskStatus} from "../../../core/models";
import {Sort} from "@angular/material/sort";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {TaskService} from "../../../tasks/services/task.service";
import {NotificationService} from "../../../core/services/notification.service";
import {Store} from "@ngrx/store";
import {TaskAPIActions} from "../../../Store/task-store/task-api.actions";
import {NgForm} from "@angular/forms";
import {Operations} from "../../enums/Operations";
import {ModalService} from "../../../core/services/modal.service";
import {AddTaskModalComponent} from "./add-task-modal/add-task-modal.component";

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        transform: 'scaleX(0.01)', opacity: 0
      })),
      transition('void <=> *', animate(400)),
    ]),
    trigger('taskFadeInOut', [
      state('void', style({
        transform: 'scaleX(0.01)', opacity: 0
      })),
      transition('void <=> *', animate(500)),
    ]),
  ]
})
export class TasksListComponent {

  @Input() tasksList: Task[] = [];
  @Input() targetId!: number;
  @Output() taskEvent = new EventEmitter();
  taskStatuses = Object.values(TaskStatus);
  taskPriority = Object.values(TaskPriority);
  classes = GlobalClasses;
  showAddToDoTaskForm: boolean = false;
  showAddTaskModalForm: boolean = false;
  TaskPriorityNames = TaskPriority;

  constructor(private taskService:TaskService,
              private store$: Store,
              private modalService: ModalService,
              private notificationService: NotificationService) {
  }

  addTaskFormHandler(addTaskFrom: NgForm) {
    if (addTaskFrom.invalid){
      this.notificationService.showErrorNotification('Title Must be between 5 and 255 characters long!');
      return;}
    if (!this.targetId){
      this.notificationService.showErrorNotification('Target ID not set!');
      return;
    }
    const formData = addTaskFrom.value;
    formData.target_id = this.targetId

    let task;
    task = {...state,title: formData.title}
    task = {...task,target_id: this.targetId}

    if (formData.priority !== ""){
      task = {...task,priority: formData.priority}
    }
    if (formData.status !== ""){
      task = {...task,status: formData.status}
    }
    if (formData.start_date !== ""){
      task = {...task,start_date: formData.start_date}
    }
    if (formData.end_date !== ""){
      task = {...task,end_date: formData.end_date}
    }

    this.taskService.saveTask(task).subscribe({
      next: (response) => {
        this.notificationService.showSuccessNotification(response.message);
        this.store$.dispatch(TaskAPIActions.addTaskSuccess({targetId:this.targetId, task:response.task}));
        this.taskEvent.emit({operation: Operations.ADDED});
      },
      error: (err) => this.notificationService.showErrorNotification(err.error.message)
    })
  }

  updateTaskId(taskId: number | null | undefined,
               status: string | TaskStatus | null | undefined,
               type: string, field:string) {
    //TODO: status is needed if I implement separate tasks in separate tables by status
    // for deciding in which status list to add the task after the change!
    if (!taskId || !type || !field || !status){
      alert('Invalid Task Update Request!');
      return;
    }
    const changedTask = {id:taskId, [type]: field }

    this.taskService.updateTask(taskId,changedTask).subscribe({
      next: (response) => {
        this.notificationService.showSuccessNotification(response.message);
        // this.store$.dispatch(TaskAPIActions.updateTaskSuccess({changedTask: response.task}));
        if (type == 'status' && field == TaskStatus.COMPLETED){
          this.taskEvent.emit({operation: Operations.COMPLETED});
        }else if (type == 'status' && field != TaskStatus.COMPLETED){
          this.taskEvent.emit({operation: Operations.UPDATED});
        }
      },
      error: (er) => {
        this.notificationService.showErrorNotification(er.error.message);
      }
    })

  }

  openEditTaskModal(task: Task) {
    //TODO open modal with option to see and edit everything title,desc,dates,tags,etc
  }

  openDeleteTaskModal(task:Task) {
    const taskId = task.id;
    const isCompleted = task.status === TaskStatus.COMPLETED;
    if (confirm('Are you sure?')){
      //TODO: create nice modal for delete confirmation
    //TODO: send delete request with Effect not service!!
    this.taskService.deleteTask(taskId).subscribe({
      next: (response) => {
        this.notificationService.showSuccessNotification(response.message);
        this.store$.dispatch(TaskAPIActions.deleteTaskSuccess({taskId}));
        this.taskEvent.emit({operation: Operations.REMOVED,isDeletedTaskCompleted: isCompleted});
      },
      error: (err) => {
        this.notificationService.showErrorNotification(err.error.message);
      }
    })
    }
  }

  toDate(date: string) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const toDate = new Date(date);
    const month = toDate.getMonth();
    const day = toDate.getDate();
    const year = toDate.getFullYear();
    return `${monthNames[month]} ${day}, ${year} 0:00`;
  }

  sortData(sort: Sort) {
    const data = this.tasksList.slice();
    if (!sort.active || sort.direction === '') {
      this.tasksList = data;
      return;
    }

    this.tasksList = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title':
          return compare(a.title, b.title, isAsc);
        case 'priority':
          return compare(a.priority, b.priority, isAsc);
        case 'status':
          return compare(a.status, b.status, isAsc);
        case 'startDate':
          return compare(a.start_date, b.start_date, isAsc);
        case 'endDate':
          return compare(a.end_date, b.end_date, isAsc);
        default:
          return 0;
      }
    });
  }

  showAddTaskModal() {
    const dialog = this.modalService.openFormModal(AddTaskModalComponent,
      {modalOpened: this.showAddTaskModalForm});
    dialog.afterClosed().subscribe(result => {
      if (result && result.data.taskForm){
        this.addTaskFormHandler(result.data.taskForm)
      }
      this.showAddTaskModalForm = result.data.showModal;
    })
  }
}

function compare(a: number | TaskPriority | string | undefined|null,
                 b: number | TaskPriority | string | undefined|null, isAsc: boolean) {
  if (!a || !b) { return 0 }
  let isPriority = false;
  let isStatus = false;
  switch (a) {
    case TaskPriority.URGENT: a = 1; isPriority = true; break;
    case TaskPriority.HIGH: a = 2; isPriority = true; break;
    case TaskPriority.LOW: a = 3; isPriority = true; break;
    case TaskPriority.NO_PRIORITY: a = 4; isPriority = true; break;
    case TaskStatus.COMPLETED: a = 4; isStatus = true; break;
    case TaskStatus.IN_Revision: a = 3; isStatus = true; break;
    case TaskStatus.TO_DO: a = 2; isStatus = true; break;
    case TaskStatus.IN_PROGRESS: a = 1; isStatus = true; break;
  }
  if (isPriority){
    switch (b) {
      case TaskPriority.URGENT: b = 1; break;
      case TaskPriority.HIGH: b = 2; break;
      case TaskPriority.LOW: b = 3; break;
      case TaskPriority.NO_PRIORITY: b = 4; break;
    }
  }else if (isStatus){
    switch (b) {
      case TaskStatus.COMPLETED: b = 4; break;
      case TaskStatus.IN_Revision: b = 3; break;
      case TaskStatus.TO_DO: b = 2; break;
      case TaskStatus.IN_PROGRESS: b = 1; break;
    }
  }

  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
