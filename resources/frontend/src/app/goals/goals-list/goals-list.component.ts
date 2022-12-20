import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {Goal} from "../../core/models";
import {goalsListSelectors} from "../../Store/goals-store/goal-selectors";
import {GoalPageActions} from "../../Store/goals-store/goal-page.actions";
import {NgForm} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {AddGoalModalComponent} from "../components/add-goal-modal/add-goal-modal.component";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-goals-list',
  templateUrl: './goals-list.component.html',
  styleUrls: ['./goals-list.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        transform: 'scale(0.5)', opacity: 0
      })),
      transition('void <=> *', animate(400)),
    ]),
  ]
})
export class GoalsListComponent {

  $goalsList$!: Observable<Goal[]>;

  constructor(private store$: Store,
              private dialog: MatDialog) {
    this.$goalsList$ =  this.store$.select(goalsListSelectors.selectGoalsList);
  }

  ngOnInit(){
    this.store$.dispatch(GoalPageActions.get());
  }

  addGoal(addGoalForm: NgForm){
    console.log(addGoalForm.value)
  }

  openAddGoalModal() {
    let dialogRef = this.dialog.open(AddGoalModalComponent,
      {
        width: '75%',
        // width: '750px',
        enterAnimationDuration: '200ms',
        exitAnimationDuration: '200ms',
        data: {goalId: '1'}
      })

    dialogRef.afterClosed().subscribe(result => {
      this.store$.dispatch(GoalPageActions.addNewGoal({goal:result.data}));
    })
  }

  setActiveGoal(goalId: number) {
    this.store$.dispatch(GoalPageActions.getActiveGoal({goalId}));
  }
}
