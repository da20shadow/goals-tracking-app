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
import {Title} from "@angular/platform-browser";
import {DateFn} from "../../shared/utils/date-fn";

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
  daysLeft!: string | number;
  dailyTarget!: string;
  htmlDescription: string = '';

  constructor(private store$: Store, private activatedRoute: ActivatedRoute,
              private route: Router, private goalService: GoalService,
              private notificationService: NotificationService,
              private title: Title, public dateFn: DateFn) {
    this.activeGoal$ = this.store$.select(goalsListSelectors.selectActiveGoal);
    this.title.setTitle('Goal Details - GoalsApp');
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const goalId = params['id'];
      this.store$.dispatch(GoalPageActions.getActiveGoal({goalId}));
      this.getGoalTargets(goalId);
    });

    const oneDay = 24 * 60 * 60 * 1000;

    this.activeGoal$.subscribe(goal => {
      if (goal) {
        const today = new Date();
        const dueDate = new Date(goal.due_date);
        const startDateInMillis = today.getTime();
        const dueDateInMillis = dueDate.getTime();

        let left = Math.round(dueDateInMillis - startDateInMillis);

        if (left < 0) {
          this.daysLeft = 'Overdue';

        } else {
          left = Math.round((dueDateInMillis - startDateInMillis) / oneDay);
          this.daysLeft = left;
        }
        this.dailyTarget = left <= 0 ? '100' : (100 / left).toFixed(1);
      }
    });
  }

  ngOnDestroy() {
    this.store$.dispatch(TargetPageActions.clear());
  }

  onTargetEvent(action: any, currentGoal: Goal) {
    let totalCompletedTargets = currentGoal.totalCompletedTargets;
    let totalTargets = currentGoal.totalTargets;
    if (action.type === 'added') {
      totalTargets++;
      const progress = (totalCompletedTargets / totalTargets) * 100;
      const goal = {
        ...currentGoal,
        progress,
        totalTargets,
        totalCompletedTargets
      };
      this.store$.dispatch(GoalsAPIActions.updateActiveGoalSuccess({goal}))
    }
  }

  getGoalTargets(goalId: number) {
    this.store$.dispatch(TargetPageActions.get({goalId}));
  }

  editGoalFormHandler(editGoalForm: NgForm) {
    if (editGoalForm.invalid) {
      this.notificationService.showErrorNotification('Invalid Form Fields!');
      return;
    }
    const changedGoal = editGoalForm.value;
    if (this.htmlDescription !== ''){
      changedGoal.description = this.htmlDescription;
    }

    this.store$.dispatch(GoalPageActions.updateActiveGoal({goalId: changedGoal.id, changedGoal}))
    this.editGoal = false;
  }

  deleteGoal(goalId: number) {
    if (!goalId) { alert('Invalid Goal!'); return; }

    if (confirm('Are you sure? All Targets and tasks also will be deleted!')) {
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

  richEditHandler(editorForm: NgForm) {
    console.log(editorForm)
    console.log(editorForm.value)
  }

  getHtml($event: any) {
    console.log($event)
    this.htmlDescription = $event
  }
}
