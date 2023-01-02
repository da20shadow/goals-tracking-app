import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Task, TaskPriority, TaskStatus} from 'src/app/core/models';

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

  constructor(@Inject(MAT_DIALOG_DATA) public modalData: any) {
    this.task = modalData.task;
  }

  updateTaskId(id: number, status: TaskStatus | string, type: string, field: string) {
    //TODO:
  }

  deleteTask(task: Task) {
    if (confirm('Are you sure?')){
      //TODO:
    }
  }

  addTag() {
    //TODO:
  }
}
