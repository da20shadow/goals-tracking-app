import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {GlobalClasses} from "../../../shared/styles/global-classes";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-goal-modal',
  templateUrl: './add-goal-modal.component.html',
  styleUrls: ['./add-goal-modal.component.scss']
})
export class AddGoalModalComponent {

  classes = GlobalClasses;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AddGoalModalComponent>) {
  }

  ngOnInit(){
    console.log(this.data)
  }

  addGoalFormHandler(addGoalForm: NgForm) {

    if (addGoalForm.invalid){
      return;
    }
    console.log('addGoalForm dialog ',addGoalForm.value)
    this.dialogRef.close({data:addGoalForm.value});

  }
}
