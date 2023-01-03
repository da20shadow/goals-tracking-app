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
    {url: '/', navName: 'Home'},
    {url: 'faq', navName: 'FAQ'},
    {url: 'about', navName: 'About'},
    {url: 'contact-us', navName: 'Contact us'},
    {url: 'login', navName: 'Login'},
    {url: 'register', navName: 'Register'},
    {url: 'invalid-url', navName: 'Invalid URL'},
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
