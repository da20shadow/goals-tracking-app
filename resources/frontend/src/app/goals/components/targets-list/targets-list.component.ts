import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Target} from "../../../core/models";
import {GlobalClasses} from "../../../shared/styles/global-classes";
import {NotificationService} from "../../../core/services/notification.service";
import {Store} from "@ngrx/store";
import {NgForm} from "@angular/forms";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {TargetService} from "../../../targets/services/target.service";
import {TargetApiActions} from "../../../Store/tartgets-store/target-api.actions";
import {Observable} from "rxjs";
import {targetSelectors} from "../../../Store/tartgets-store/target-selectors";

@Component({
  selector: 'app-targets-list',
  templateUrl: './targets-list.component.html',
  styleUrls: ['./targets-list.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        transform: 'scaleX(0.01)', opacity: 0
      })),
      transition('void <=> *', animate(400)),
    ]),
  ]
})
export class TargetsListComponent {

  targetsList$: Observable<Target[]>;
  @Input() dailyTarget = '';
  @Input() goalId!: number;
  @Output() onTargetEvents = new EventEmitter();
  showAddTargetForm: boolean = false;
  classes = GlobalClasses;
  targetsDone?:number = 0;
  totalTargets?:number = 0;

  constructor(private notificationService: NotificationService,
              private targetService: TargetService,
              private store$: Store) {
    this.targetsList$ = this.store$.select(targetSelectors.selectTargetsList);
  }

  ngOnInit(){
    this.targetsList$.subscribe((targetList) => {
      this.totalTargets = targetList.length;
      let completed = 0;
      targetList.map(t => {
        if (t.progress >= 100){
          completed++;
        }
      })
      this.targetsDone = completed;
    })
  }

  ngOnDestroy(){
  }

  addTargetFormHandler(addTargetFrom: NgForm) {
    if (addTargetFrom.invalid){
        this.notificationService.showErrorNotification('Title Must be between 5 and 255 characters long!');
      return;}
    if (!this.goalId){
      this.notificationService.showErrorNotification('Goal ID not set!');
      return;
    }
    const formData = addTargetFrom.value;
    formData.goal_id = this.goalId

    this.targetService.saveTarget(formData).subscribe({
      next: (response) => {
        this.notificationService.showSuccessNotification(response.message);
        this.store$.dispatch(TargetApiActions.addTargetSuccess({target:response.target}))

        this.onTargetEvents.emit({type: 'added'});
      },
      error: (err) => {
        this.notificationService.showErrorNotification(err.error.message)
      }
    })
  }

}
