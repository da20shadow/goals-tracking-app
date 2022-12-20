import {Component, Input} from '@angular/core';
import {GlobalClasses} from "../../../../shared/styles/global-classes";

@Component({
  selector: 'app-nav-links',
  templateUrl: './nav-links.component.html',
  styleUrls: ['./nav-links.component.scss']
})
export class NavLinksComponent {

  @Input()
  navLinks:any;
  classes = GlobalClasses;
}
