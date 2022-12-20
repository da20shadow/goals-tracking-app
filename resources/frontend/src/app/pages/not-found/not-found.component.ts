import { Component } from '@angular/core';
import {GlobalClasses} from "../../shared/styles/global-classes";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

  classes = GlobalClasses;
}
