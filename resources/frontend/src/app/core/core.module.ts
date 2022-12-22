import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {NavLinksComponent} from './components/header/nav-links/nav-links.component';
import {PrivateNavComponent} from './components/header/private-nav/private-nav.component';
import {PublicNavComponent} from './components/header/public-nav/public-nav.component';
import {RouterModule} from "@angular/router";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { SpinnerComponent } from './components/spinner/spinner.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavLinksComponent,
    PrivateNavComponent,
    PublicNavComponent,
    SpinnerComponent
  ],
    exports: [
        HeaderComponent,
        FooterComponent,
        SpinnerComponent
    ],
  imports: [
    CommonModule,
    RouterModule,
    MatSnackBarModule,
    MatMenuModule,
    MatIconModule,
  ]
})
export class CoreModule {
}
