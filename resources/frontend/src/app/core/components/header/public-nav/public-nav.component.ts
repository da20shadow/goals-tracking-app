import { Component } from '@angular/core';
import {GlobalClasses} from "../../../../shared/styles/global-classes";
import {DarkLightModeService} from "../../../services/dark-light-mode.service";

@Component({
  selector: 'app-public-nav',
  templateUrl: './public-nav.component.html',
  styleUrls: ['./public-nav.component.scss']
})
export class PublicNavComponent {

  classes = GlobalClasses;
  darkMode: boolean;

  publicNavLinks = [
    {url: '/', name: 'Home'},
    {url: 'faq', name: 'FAQ'},
    {url: 'about', name: 'About'},
    {url: 'contact-us', name: 'Contact us'},
    {url: 'login', name: 'Login'},
    {url: 'register', name: 'Register'},
    {url: 'invalid-url', name: 'Invalid URL'},
  ]

  constructor(private darkModeService: DarkLightModeService) {
    this.darkMode = this.darkModeService.checkUserPreferredMode();
  }

  toggleDarkMode() {
    if (this.darkMode){
      this.darkModeService.enableLightTheme()
      this.darkMode = false;
    }else{
      this.darkModeService.enableDarkTheme()
      this.darkMode = true;
    }
  }
}
