import { Component } from '@angular/core';
import {GlobalClasses} from "../../shared/styles/global-classes";
import {Title} from "@angular/platform-browser";
import {Store} from "@ngrx/store";
import {NgForm} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {UserAPIActions} from "../../Store/user-store/user-api.actions";
import {NotificationService} from "../../core/services/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  classes = GlobalClasses;

  constructor(private titleService: Title,
              private authService: AuthService,
              private router: Router,
              private notificationService: NotificationService,
              private store$: Store) {
    this.titleService.setTitle('Login - GoalsApp');
  }

  ngOnInit() {

  }

  loginHandler(loginForm: NgForm) {
    if(loginForm.invalid){
      this.notificationService.showErrorNotification("Invalid Credentials!");
      return;
    }
    const {email, password} = loginForm.value;
    this.authService.login(email,password).subscribe({
      next: (response) => {
        this.notificationService.showSuccessNotification(response.message);
        this.store$.dispatch(UserAPIActions.loginSuccess({user:response.user}));
        this.router.navigate(['profile']);
      },
      error: (err) => {
        this.notificationService.showErrorNotification(err.error.message);
      }
    })
  }
}
