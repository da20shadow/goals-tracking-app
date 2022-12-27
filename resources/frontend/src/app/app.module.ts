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
import {SharedModule} from "./shared/components/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthModule} from "./auth/auth.module";
import {UserApiEffects} from "./Store/user-store/user-api.effects";
import {GoalApiEffects} from "./Store/goals-store/goals-api.effects";
import {MatDialogModule} from "@angular/material/dialog";
import {TargetEffects} from "./Store/tartgets-store/target.effects";
import {TaskApiEffects} from "./Store/task-store/task-api.effects";
import {LoadingInterceptor} from "./core/interceptors/loading.interceptor";
import {AgendaApiEffects} from "./Store/agenda-store/agenda-api.effects";
import {NgxEditorModule} from "ngx-editor";
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {LineChartModule} from "./shared/components/charts/line-chart/line-chart.module";



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
    SharedModule,
    AuthModule,
    NgxEditorModule.forRoot({
      locals: {
        // menu
        bold: 'Bold',
        italic: 'Italic',
        code: 'Code',
        blockquote: 'Blockquote',
        underline: 'Underline',
        strike: 'Strike',
        bullet_list: 'Bullet List',
        ordered_list: 'Ordered List',
        heading: 'Heading',
        h1: 'Header 1',
        h2: 'Header 2',
        h3: 'Header 3',
        h4: 'Header 4',
        h5: 'Header 5',
        h6: 'Header 6',
        align_left: 'Left Align',
        align_center: 'Center Align',
        align_right: 'Right Align',
        align_justify: 'Justify',
        text_color: 'Text Color',
        background_color: 'Background Color',
        // popups, forms, others...
        url: 'URL',
        text: 'Text',
        openInNewTab: 'Open in new tab',
        insert: 'Insert',
        altText: 'Alt Text',
        title: 'Title',
        remove: 'Remove',
      },
    }),
    LineChartModule,
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
  bootstrap: [AppComponent]
})
export class AppModule {
}
