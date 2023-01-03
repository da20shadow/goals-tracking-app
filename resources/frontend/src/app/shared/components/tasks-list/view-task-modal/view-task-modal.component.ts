import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Task, TaskPriority, TaskStatus} from 'src/app/core/models';
import {TaskService} from "../../../../tasks/services/task.service";
import {NotificationService} from "../../../../core/services/notification.service";
import {Store} from "@ngrx/store";
import {TaskPageActions} from "../../../../Store/task-store/task-page.actions";
import {TaskAPIActions} from "../../../../Store/task-store/task-api.actions";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-view-task-modal',
  templateUrl: './view-task-modal.component.html',
  styleUrls: ['./view-task-modal.component.scss']
})
export class ViewTaskModalComponent {

  task!: Task;
  taskStatuses = Object.values(TaskStatus);
  taskPriority = Object.values(TaskPriority);
  TaskPriorityNames = TaskPriority;
  editDescription: boolean = false;
  editTitle: boolean = false;
  // range = new FormGroup({
  //   start_date: new FormControl<Date | null>(null),
  //   end_date: new FormControl<Date | null>(null),
  // });

  constructor(@Inject(MAT_DIALOG_DATA) public modalData: any,private store$: Store,
              private taskService: TaskService,private notificationService: NotificationService) {
    this.task = modalData.task;
  }

  updateTaskId(id: number, status: TaskStatus | string, type: string, field: string) {
    //TODO:
    console.log('taskId', id)
    console.log('status', status)
    console.log('type', type)
    console.log('field', field)

    const changedTask = {id, [type]: field }
    this.taskService.updateTask(id,changedTask).subscribe({
      next: (response)=> {
        this.notificationService.showSuccessNotification(response.message)
        this.store$.dispatch(TaskAPIActions.updateTaskSuccess({changedTask:response.task}))
      },
      error: err => {
        this.notificationService.showSuccessNotification(err.error.message)
      }
    })
  }

  deleteTask(task: Task) {
    if (confirm('Are you sure?')){
      //TODO:
    }
  }

  addTag() {
    //TODO:
  }

  updateTaskDesc(html: any,task: Task) {
    //TODO: add the rich text editor
    this.updateTaskId(task.id,task.status,'description',html)
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
}
