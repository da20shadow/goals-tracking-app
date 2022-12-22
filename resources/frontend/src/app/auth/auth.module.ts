import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from "../shared/shared.module";
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {LogoutComponent} from './logout/logout.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {ProfileComponent} from "./profile/profile.component";
import {EditProfileComponent} from "./profile/edit-profile/edit-profile.component";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    ProfileComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    MatIconModule,
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    EditProfileComponent
  ]
})
export class AuthModule {
}
