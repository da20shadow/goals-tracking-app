import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {FaqComponent} from "./pages/faq/faq.component";
import {ContactUsComponent} from "./pages/contact-us/contact-us.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {ProfileComponent} from "./auth/profile/profile.component";
import {isLoggedInGuardFn} from "./auth/guards/isLoggedInGuardFn";
import {EditProfileComponent} from "./auth/profile/edit-profile/edit-profile.component";
import {LogoutComponent} from "./auth/logout/logout.component";

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch:'full'},
  {path: 'faq', component: FaqComponent},
  {path: 'contact-us', component: ContactUsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'profile',component: ProfileComponent,
    canActivate: [isLoggedInGuardFn],
    canLoad: [isLoggedInGuardFn]
  },
  {
    path: 'profile/edit', component: EditProfileComponent,
    canActivate: [isLoggedInGuardFn],
    canLoad: [isLoggedInGuardFn]
  },
  {
    path: 'logout', component: LogoutComponent,
    canActivate: [isLoggedInGuardFn]
  },
  {
    path: 'goals',loadChildren: () =>
      import('./goals/goals.module').then(m => m.GoalsModule),
    canActivate: [isLoggedInGuardFn],
    canLoad: [isLoggedInGuardFn]
  },
  {
    path: 'target',loadChildren: () =>
      import('./targets/targets.module').then(m => m.TargetsModule),
    canActivate: [isLoggedInGuardFn],
    canLoad: [isLoggedInGuardFn]
  },
  {
    path: 'tasks',loadChildren: () =>
      import('./tasks/tasks.module').then(m => m.TasksModule),
    canActivate: [isLoggedInGuardFn],
    canLoad: [isLoggedInGuardFn]
  },
  {path: '**', component: NotFoundComponent, pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
