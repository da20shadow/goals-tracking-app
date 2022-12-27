import { Component } from '@angular/core';
import {UserPageActions} from "../../Store/user-store/user-page.actions";
import {Store} from "@ngrx/store";
import {GoalPageActions} from "../../Store/goals-store/goal-page.actions";
import {TargetPageActions} from "../../Store/tartgets-store/target-page.actions";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor(private store$: Store) {
    this.store$.dispatch(UserPageActions.logout());
    this.store$.dispatch(GoalPageActions.clear());
    this.store$.dispatch(TargetPageActions.clear());
  }

}
