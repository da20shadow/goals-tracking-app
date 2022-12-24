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
import {ChartType} from "../../shared/enums/ChartType";
import {Title} from "@angular/platform-browser";
import {ModalService} from "../../core/services/modal.service";

@Component({
  selector: 'app-goals-list',
  templateUrl: './goals-list.component.html',
  styleUrls: ['./goals-list.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        transform: 'scale(0.01)', opacity: 0
      })),
      transition('void <=> *', animate(400)),
    ]),
  ]
})
export class GoalsListComponent {

  $goalsList$!: Observable<Goal[]>;
  chartTypes = ChartType;
  constructor(private store$: Store,
              private title: Title,
              private modalService: ModalService,
              private dialog: MatDialog) {
    this.$goalsList$ =  this.store$.select(goalsListSelectors.selectGoalsList);
    this.title.setTitle('My Goals - GoalsApp');
  }

  ngOnInit(){
    this.store$.dispatch(GoalPageActions.get());
  }

  addGoal(addGoalForm: NgForm){
    console.log(addGoalForm.value)
  }

  openAddGoalModal() {
    let dialogRef = this.modalService.openFormModal(AddGoalModalComponent,{title:'Add New Goal!'});

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.data.goalForm){
        this.store$.dispatch(GoalPageActions.addNewGoal({goal:result.data.goalForm}));
      }
    })
  }

  setActiveGoal(goalId: number) {
    this.store$.dispatch(GoalPageActions.setActiveGoal({goalId}));
  }
}
