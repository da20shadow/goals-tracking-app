import {Component, Inject} from '@angular/core';
import {FormBuilder, NgForm} from "@angular/forms";
import {GlobalClasses} from "../../../shared/styles/global-classes";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../../core/services/notification.service";

@Component({
  selector: 'app-add-goal-modal',
  templateUrl: './add-goal-modal.component.html',
  styleUrls: ['./add-goal-modal.component.scss']
})
export class AddGoalModalComponent {

  classes = GlobalClasses;
  title = this.modalData.title;


  constructor(@Inject(MAT_DIALOG_DATA) public modalData: any,
              public dialogRef: MatDialogRef<AddGoalModalComponent>,
              private notificationService: NotificationService,
              private formBuilder: FormBuilder) {
  }

  addGoalFormHandler(addGoalForm: NgForm) {

    console.log('addGoalForm: ',addGoalForm)
    console.log('addGoalForm: ',addGoalForm.value)

    if (addGoalForm.invalid){
      console.log('addGoalForm.invalid: ',addGoalForm)
      const today = new Date();
      if (!addGoalForm.value.title || addGoalForm.value.title.invalid){
        this.notificationService.showErrorNotification('Title must be between 5 and 255 characters long!')
      }else if (!addGoalForm.value.description || addGoalForm.value.description.invalid){
        this.notificationService.showErrorNotification('Goal description must be at least 5 characters long!')
      }else if (!addGoalForm.value.due_date){

        const due = new Date(addGoalForm.value.due_date);
        const time = due.getTime() - today.getTime();
        if ( time < 0 || addGoalForm.value.due_date.invalid){
          this.notificationService.showErrorNotification('Please, set valid Goal due date!');
        }else {
          this.notificationService.showErrorNotification('Please, set Goal due date!');
        }
      }
      return;
    }
    if (addGoalForm.value.start_date){
      const startDate = new Date(addGoalForm.value.start_date);
      const dueDate = new Date(addGoalForm.value.due_date);
      const difference = dueDate.getTime() - startDate.getTime()
      if (difference < 0){
        this.notificationService.showErrorNotification('Goal Start Date can not be after Goal Due Date!')
        return;
      }
    }

    if (addGoalForm.valid){
      this.dialogRef.close({data: {goalForm: addGoalForm.value}});
    }
  }

  currentDate() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  reactiveFormHandlerTest($event: any) {
    console.log($event)
  }
}
