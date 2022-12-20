import {Component, Input} from '@angular/core';
import {GlobalClasses} from "../../styles/global-classes";

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent {
  @Input() title: string = '';
  @Input() text: string = '';
  classes = GlobalClasses;
}
