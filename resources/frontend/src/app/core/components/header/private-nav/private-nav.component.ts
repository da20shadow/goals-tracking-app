import { Component } from '@angular/core';
import {DarkLightModeService} from "../../../services/dark-light-mode.service";
import {GlobalClasses} from "../../../../shared/styles/global-classes";

@Component({
  selector: 'app-private-nav',
  templateUrl: './private-nav.component.html',
  styleUrls: ['./private-nav.component.scss']
})
export class PrivateNavComponent {

  privateNavLinks = [
    {url: 'goals', name: 'Goals'},
    {url: 'agenda', name: 'Agenda'},
  ]
  darkMode: boolean;
  openSidenav: boolean = false;
  classes = GlobalClasses;

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
