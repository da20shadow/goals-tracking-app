import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Task, TaskPriority, TaskStatus} from 'src/app/core/models';
import {TaskService} from "../../../../tasks/services/task.service";
import {NotificationService} from "../../../../core/services/notification.service";
import {Store} from "@ngrx/store";
import {TaskPageActions} from "../../../../Store/task-store/task-page.actions";
import {TaskAPIActions} from "../../../../Store/task-store/task-api.actions";
import {FormControl, FormGroup} from "@angular/forms";
import {Operations} from "../../../enums/Operations";
import {AgendaAPIActions} from "../../../../Store/agenda-store/agenda-api.actions";

@Component({
  selector: 'app-view-task-modal',
  templateUrl: './view-task-modal.component.html',
  styleUrls: ['./view-task-modal.component.scss']
})
export class ViewTaskModalComponent {

  task!: Task;
  taskDescription: string = '';

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

  updateTaskId(id: number, status: TaskStatus | string, type: string, field: string) {
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
        let startDate;
        if (changedTask.start_date) {
          startDate = new Date(changedTask.start_date);
        }
        let endDate;
        if (changedTask.end_date) {
          endDate = new Date(changedTask.end_date);
        }
        const today = new Date();
        if (startDate && startDate.getDate() === today.getDate() && startDate.getMonth() === today.getMonth() && startDate.getFullYear() === today.getFullYear()
          || endDate && endDate.getDate() === today.getDate() && endDate.getMonth() === today.getMonth() && endDate.getFullYear() === today.getFullYear()) {
          this.store$.dispatch(AgendaAPIActions.updateTodayTaskSuccess({changedTask}));
          if (changedTask.priority === TaskPriority.URGENT) {
            this.store$.dispatch(TaskAPIActions.updateTaskSuccess({changedTask}))
          }
        }
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
    //TODO: add the rich text editor
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

  updateTaskEndDate(date: string,task: Task) {
    this.updateTaskId(task.id,task.status,'end_date',date);
  }

  updateTaskStartDate(date: string, task: Task) {
    this.updateTaskId(task.id,task.status,'start_date',date);
  }
}
