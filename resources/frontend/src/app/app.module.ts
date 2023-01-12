import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JWTInterceptorService} from "./auth/interceptors/jwt-interceptor";
import {APP_BASE_HREF} from "@angular/common";
import {AppStateModule} from "./Store/app.state";
import {extModules} from "./build-specifics";
import {CoreModule} from "./core/core.module";
import {PagesModule} from "./pages/pages.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthModule} from "./auth/auth.module";
import {UserApiEffects} from "./Store/user-store/user-api.effects";
import {GoalApiEffects} from "./Store/goals-store/goals-api.effects";
import {MatDialogModule} from "@angular/material/dialog";
import {TargetEffects} from "./Store/tartgets-store/target.effects";
import {TaskApiEffects} from "./Store/task-store/task-api.effects";
import {LoadingInterceptor} from "./core/interceptors/loading.interceptor";
import {AgendaApiEffects} from "./Store/agenda-store/agenda-api.effects";
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    ReactiveFormsModule,
    AppStateModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([
      UserApiEffects,
      GoalApiEffects,
      TargetEffects,
      TaskApiEffects,
      AgendaApiEffects
    ]),
    StoreRouterConnectingModule.forRoot(),
    extModules,
    CoreModule,
    PagesModule,
    AuthModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    {provide: APP_BASE_HREF, useValue: '/'}
  ],
    exports: [
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
