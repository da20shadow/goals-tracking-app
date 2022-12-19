import { Component } from '@angular/core';
import {GlobalClasses} from "../../../shared/styles/global-classes";
import {AuthService} from "../../../auth/services/auth.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  classes = GlobalClasses;

  constructor(public authService: AuthService) {

  }
}
