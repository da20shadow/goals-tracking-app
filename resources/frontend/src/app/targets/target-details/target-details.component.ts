import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {Target, Task} from "../../core/models";
import {Store} from "@ngrx/store";
import {targetSelectors} from "../../Store/tartgets-store/target-selectors";
import {TargetPageActions} from "../../Store/tartgets-store/target-page.actions";
import {ActivatedRoute} from "@angular/router";
import {taskSelectors} from "../../Store/task-store/task-selectors";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {NgForm} from "@angular/forms";
import {NotificationService} from "../../core/services/notification.service";
import {TargetApiActions} from "../../Store/tartgets-store/target-api.actions";
import {TaskPageActions} from "../../Store/task-store/task-page.actions";
import {Operations} from "../../shared/enums/Operations";

@Component({
  selector: 'app-target-details',
  templateUrl: './target-details.component.html',
  styleUrls: ['./target-details.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        transform: 'scaleY(0.01)', opacity: 0
      })),
      transition('void <=> *', animate(400)),
    ]),
    trigger('taskFadeInOut', [
      state('void', style({
        transform: 'scaleX(0.01)', opacity: 0
      })),
      transition('void <=> *', animate(500)),
    ]),
  ]
})
export class TargetDetailsComponent {

  activeTarget$: Observable<Target|null>;
  targetTasksList$: Observable<Task[]>;
  editTarget: boolean = false;

  constructor(private store$: Store, private activatedRoute: ActivatedRoute,
              private notificationService: NotificationService) {
    this.activeTarget$ = this.store$.select(targetSelectors.selectActiveTarget);
    this.targetTasksList$ = this.store$.select(taskSelectors.selectTargetTasksList);
  }

  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      const targetId = params['id'];
      this.loadTargetId(targetId);
      this.loadTargetTasks(targetId);
    });
  }

  ngOnDestroy(){
    this.store$.dispatch(TaskPageActions.clear());
  }

  loadTargetId(targetId:number){
    this.store$.dispatch(TargetPageActions.getActiveTarget({targetId}));
  }

  loadTargetTasks(targetId: number){
    this.store$.dispatch(TargetPageActions.getActiveTargetTasks({targetId}))
  }

  editTargetFormHandler(editTargetForm: NgForm) {
    if (editTargetForm.invalid){
      this.notificationService.showErrorNotification('Invalid Form Fields!');
      return;
    }
    const formData = editTargetForm.value;
    this.store$.dispatch(TargetPageActions.updateActiveTarget({targetId:formData.id,changedTarget:formData}))

    this.editTarget = false;
  }

  deleteTarget(targetId: number,goalId:number) {
    this.store$.dispatch(TargetPageActions.deleteActiveTarget({targetId,goalId}));
  }

  updateTargetProgress($event: any,currentTarget: Target) {
    const operation = $event.operation;
    let total_completed_tasks = Number(currentTarget.total_completed_tasks);
    let total_tasks = currentTarget.total_tasks;

    switch (operation){
      case Operations.ADDED:
        total_tasks++;
        break;
      case Operations.REMOVED:
        if ($event.isDeletedTskCompleted){
          total_completed_tasks--;
        }
        total_tasks--;
        break;
      case Operations.COMPLETED:
        total_completed_tasks++;
        break;
    }
    const progress = (total_completed_tasks / total_tasks) * 100;
    const target = {
      ...currentTarget,
      progress,
      total_tasks,
      total_completed_tasks
    };
    this.store$.dispatch(TargetApiActions.updateActiveTargetSuccess({target}))
  }
}


