import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Task, TaskPriority, TaskStatus} from 'src/app/core/models';
import {TaskService} from "../../../../tasks/services/task.service";
import {NotificationService} from "../../../../core/services/notification.service";
import {Store} from "@ngrx/store";
import {AgendaAPIActions} from "../../../../Store/agenda-store/agenda-api.actions";

@Component({
  selector: 'app-view-task-modal',
  templateUrl: './view-task-modal.component.html',
  styleUrls: ['./view-task-modal.component.scss']
})
export class ViewTaskModalComponent {

  task!: Task;
  taskDescription: string = '';
  taskStartDate: string|null = this.task?.start_date;
  taskEndDate: string|null = this.task?.end_date;

  taskStatuses = Object.values(TaskStatus);
  taskPriority = Object.values(TaskPriority);
  TaskPriorityNames = TaskPriority;
  editDescription: boolean = false;
  editTitle: boolean = false;
  editStartDate: boolean = false;
  editEndDate: boolean = false;

  // range = new FormGroup({
  //   start_date: new FormControl<Date | null>(null),
  //   end_date: new FormControl<Date | null>(null),
  // });

  constructor(@Inject(MAT_DIALOG_DATA) public modalData: any, private store$: Store,
              private dialogRef: MatDialogRef<ViewTaskModalComponent>, private taskService: TaskService, private notificationService: NotificationService) {
    this.task = modalData.task;
  }

  updateTaskId(id: number, status: TaskStatus | string, type: string, field: string|null) {
    //TODO:
    console.log('taskId', id)
    console.log('status', status)
    console.log('type', type)
    console.log('field', field)

    if (!field) {
      return;
    }
    if (type === 'description' && this.task.description === this.taskDescription) {
      return;
    }

    const changedTask = {id, [type]: field}

    let taskState = this.task;
    this.task = {...this.task, [type]: field}

    this.taskService.updateTask(id, changedTask).subscribe({
      next: (response) => {
        const changedTask = response.task;
        this.store$.dispatch(AgendaAPIActions.updateTaskSuccess({oldTaskState: taskState, changedTask}));
        // if (changedTask.priority === TaskPriority.URGENT) {
        //   this.store$.dispatch(TaskAPIActions.updateTaskSuccess({changedTask}))
        // }
      },
      error: err => {
        this.notificationService.showSuccessNotification(err.error.message);
        this.task = taskState;
      }
    })
  }

  deleteTask(task: Task) {
    if (confirm('Are you sure?')) {
      //TODO:
    }
  }

  addTag() {
    //TODO:
  }

  updateTaskDesc(html: any, task: Task) {
    this.updateTaskId(task.id, task.status, 'description', html)
  }

  // updateTaskDates(task: Task) {
  //   const id = task.id;
  //   const changedTask = {id,start_date:this.range.value.start_date,end_date: this.range.value.end_date }
  //   this.taskService.updateTask(id,changedTask).subscribe({
  //     next: (response)=> {
  //       this.notificationService.showSuccessNotification(response.message)
  //       this.store$.dispatch(TaskAPIActions.updateTaskSuccess({changedTask:response.task}))
  //     },
  //     error: err => {
  //       this.notificationService.showSuccessNotification(err.error.message)
  //     }
  //   })
  // }

  updateTaskDescription($event: string) {
    this.taskDescription = $event;
  }

  setStartDate(start_date: string){
    this.taskStartDate = start_date;
  }
  setEndDate(end_date:string){
    this.taskEndDate = end_date;
  }

  updateTaskEndDate() {
    if (this.taskEndDate && !this.areDatesValid('end_date')) { return; }
    this.updateTaskId(this.task.id, this.task.status, 'end_date', this.taskEndDate);
  }

  updateTaskStartDate() {
    if (this.taskStartDate && !this.areDatesValid('start_date')) { return; }
    this.updateTaskId(this.task.id, this.task.status, 'start_date', this.taskStartDate);
  }

  areDatesValid(type: string){
    if (type === 'end_date' && this.taskEndDate) {
      const startDate = this.task.start_date ? new Date(this.task.start_date) : new Date();
      const newEndDate = new Date(this.taskEndDate);
      if (startDate > newEndDate) {
        this.notificationService.showErrorNotification('End Date can not be before the start or today date!');
        return false;
      }
    }else if (type === 'start_date' && this.taskStartDate){
      const newStartDate = new Date(this.taskStartDate);
      const endDate = this.task.end_date ? new Date(this.task.end_date) : null;
      if (endDate && newStartDate > endDate) {
        this.notificationService.showErrorNotification('End Date can not be before the start date!');
        return false;
      }
    }
    return true;
  }
}
