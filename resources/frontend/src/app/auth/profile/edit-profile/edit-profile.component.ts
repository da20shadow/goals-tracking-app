import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../../core/models";
import {Store} from "@ngrx/store";
import {UserPageActions} from "../../../Store/user-store/user-page.actions";
import {userSelectors} from "../../../Store/user-store/user-selectors";
import {GlobalClasses} from "../../../shared/styles/global-classes";
import {AuthService} from "../../services/auth.service";
import {NotificationService} from "../../../core/services/notification.service";
import {NgForm} from "@angular/forms";
import {UserAPIActions} from "../../../Store/user-store/user-api.actions";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {

  classes = GlobalClasses;
  user$: Observable<User|null>;

  constructor(private store$: Store,private authService: AuthService,
              private notificationService: NotificationService) {
    this.store$.dispatch(UserPageActions.getUser());
    this.user$ = this.store$.select(userSelectors.selectUser);
  }

  editProfileFormHandler(editProfileForm: NgForm) {
    if (editProfileForm.invalid){
      this.notificationService.showErrorNotification('Invalid Form Fields!');
      return;
    }
    this.authService.updateProfile(editProfileForm.value).subscribe({
      next: (response) => {
        this.notificationService.showSuccessNotification(response.message);
        this.store$.dispatch(UserAPIActions.setUser({user:response.user}))
      },
      error: (err) => {
        this.notificationService.showErrorNotification(err.error.message);
      }
    })

  }
}
