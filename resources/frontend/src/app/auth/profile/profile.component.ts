import {Component} from '@angular/core';
import {User} from "../../core/models";
import {Store} from "@ngrx/store";
import {userSelectors} from "../../Store/user-store/user-selectors";
import {Observable} from "rxjs";
import {UserPageActions} from "../../Store/user-store/user-page.actions";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  user$: Observable<User | null>;

  constructor(private store$: Store, private title: Title) {
    this.title.setTitle('Profile - GoalsApp');
    this.store$.dispatch(UserPageActions.getUser());
    this.user$ = this.store$.select(userSelectors.selectUser);
  }

}
