import { Component } from '@angular/core';
import {GlobalClasses} from "../../shared/styles/global-classes";
import {Title} from "@angular/platform-browser";
import {Store} from "@ngrx/store";
import {NotificationService} from "../../core/services/notification.service";
import {UserAPIActions} from "../../Store/user-store/user-api.actions";
import {FormBuilder, Validators} from "@angular/forms";
import {emailValidator} from "../../shared/validators/email.validator";
import {sameValueValidator} from "../../shared/validators/same-value.validator";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  classes = GlobalClasses;

  regForm = this.fb.group({
    firstName: ['', [Validators.required,Validators.minLength(2)]],
    email: ['', [Validators.required, emailValidator()]],
    pass: this.fb.group({

      password: ['', [Validators.required, Validators.minLength(8)]],
      rePassword: ['', [Validators.required, Validators.minLength(8)]],

    },{validators: [sameValueValidator("password","rePassword")]})
  })

  constructor(private titleService: Title,
              private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private notificationService: NotificationService,
              private store$: Store) {
    this.titleService.setTitle('Register - GoalsApp');
  }

  ngOnInit() {
  }

  registerHandler() {
    if (this.regForm.invalid) {
      this.notificationService.showErrorNotification("Invalid Form Fields!")
      return;
    }
    const regForm = this.regForm.value;
    this.authService.register(regForm).subscribe({
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
