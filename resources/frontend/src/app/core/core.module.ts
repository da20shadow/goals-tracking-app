import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavLinksComponent } from './components/header/nav-links/nav-links.component';
import { PrivateNavComponent } from './components/header/private-nav/private-nav.component';
import { PublicNavComponent } from './components/header/public-nav/public-nav.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavLinksComponent,
    PrivateNavComponent,
    PublicNavComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
