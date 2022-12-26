import {Component, Inject} from '@angular/core';
import {NgForm} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GlobalClasses} from "../../../styles/global-classes";
import {TaskPriority, TaskStatus} from "../../../../core/models";

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.scss']
})
export class AddTaskModalComponent {
  classes = GlobalClasses;
  taskStatuses = Object.values(TaskStatus);
  taskPriority = Object.values(TaskPriority);

  constructor(private dialogRef: MatDialogRef<AddTaskModalComponent>,
              @Inject(MAT_DIALOG_DATA) public modalData: any,) {
  }

  addTaskFormHandler(addTaskFrom: NgForm) {
    console.log(addTaskFrom.value)
    if (addTaskFrom.valid){

      this.dialogRef.close({
        data: {taskForm: addTaskFrom},
        showModal: false,
      });
    }
  }

  closeModal() {
    this.dialogRef.close({data:{showModal: false}});
  }
}
