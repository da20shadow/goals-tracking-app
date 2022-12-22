import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {Goal} from "../../core/models";
import {Store} from "@ngrx/store";
import {goalsListSelectors} from "../../Store/goals-store/goal-selectors";
import {ActivatedRoute, Router} from "@angular/router";
import {GoalService} from "../services/goal.service";
import {GoalPageActions} from "../../Store/goals-store/goal-page.actions";
import {NgForm} from "@angular/forms";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {TargetPageActions} from "../../Store/tartgets-store/target-page.actions";
import {GoalsAPIActions} from "../../Store/goals-store/goal-api.actions";
import {NotificationService} from "../../core/services/notification.service";

@Component({
  selector: 'app-goal-details',
  templateUrl: './goal-details.component.html',
  styleUrls: ['./goal-details.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        transform: 'scaleY(0.01)', opacity: 0
      })),
      transition('void <=> *', animate(800)),
    ]),
    trigger('fadeGoalInOut', [
      state('void', style({
        transform: 'scaleY(0.01)', opacity: 0
      })),
      transition('void <=> *', animate(400)),
    ]),
  ]
})
export class GoalDetailsComponent {

  activeGoal$: Observable<Goal | null>;
  editGoal: boolean = false;
  daysLeft!: string|number;
  dailyTarget!: string;

  constructor(private store$: Store,private activatedRoute: ActivatedRoute,
              private route: Router,private goalService: GoalService,
              private notificationService: NotificationService) {
    this.activeGoal$ = this.store$.select(goalsListSelectors.selectActiveGoal);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const goalId = params['id'];
      this.getGoalTargets(goalId);
      this.store$.dispatch(GoalPageActions.getActiveGoal({goalId}));
    });

    const oneDay = 24 * 60 * 60 * 1000;

    this.activeGoal$.subscribe(goal => {
      if (goal) {
        const today = new Date();
        const dueDate = new Date(goal.due_date);
        const startDateInMillis = today.getTime();
        const dueDateInMillis = dueDate.getTime();

        let left = Math.round(dueDateInMillis - startDateInMillis);

        if (left < 0){
          this.daysLeft = 'Overdue';

        }else{
          left = Math.round((dueDateInMillis - startDateInMillis) / oneDay);
          this.daysLeft = left;
        }
          this.dailyTarget = left <= 0 ? '100' : (100 / left).toFixed(2);
      }
    })
  }

  ngOnDestroy(){
    this.store$.dispatch(TargetPageActions.clear());
  }

  getGoalTargets(goalId:number){
    this.store$.dispatch(TargetPageActions.get({goalId}));
  }

  editGoalFormHandler(editGoalForm: NgForm) {
    if (editGoalForm.invalid) {
      this.notificationService.showErrorNotification('Invalid Form Fields!');
      return;
    }
    const changedGoal = editGoalForm.value;
    this.store$.dispatch(GoalPageActions.updateActiveGoal({goalId: changedGoal.id, changedGoal}))
    this.editGoal = false;
  }

  deleteGoal(goalId: number) {
    if (!goalId) {
      alert('Invalid Goal!');
      return;
    }
    confirm('Are you sure? All tasks also will be deleted!');
    this.goalService.deleteGoal(goalId).subscribe({
      next: () => {
        this.store$.dispatch(GoalsAPIActions.removeActiveGoalSuccess({goalId}))
        this.route.navigate(['/goals']);
      },
      error: err => {
        alert('Error!' + err.error.message)
      }
    })
  }

}
