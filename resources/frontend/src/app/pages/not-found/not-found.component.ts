import { Component } from '@angular/core';
import {GlobalClasses} from "../../shared/styles/global-classes";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

  classes = GlobalClasses;

  constructor(private title: Title) {
    this.title.setTitle('404 Not Found - GoalsApp');
  }
}
