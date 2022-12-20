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
import {SharedModule} from "./shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthModule} from "./auth/auth.module";
import {UserApiEffects} from "./Store/user-store/user-api.effects";
import {GoalApiEffects} from "./Store/goals-store/goals-api.effects";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    AppStateModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([
      UserApiEffects,
      GoalApiEffects,
    ]),
    StoreRouterConnectingModule.forRoot(),
    extModules,
    CoreModule,
    PagesModule,
    SharedModule,
    AuthModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptorService,
      multi: true
    },
    {provide: APP_BASE_HREF, useValue: '/angular/'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
