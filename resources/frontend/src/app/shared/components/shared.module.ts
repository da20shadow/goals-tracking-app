import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageTitleComponent} from "./page-elements/page-title/page-title.component";
import {TaskTimePipe} from "../pipes/task-time.pipe";


@NgModule({
  declarations: [
    PageTitleComponent,
    TaskTimePipe

  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PageTitleComponent,
    TaskTimePipe
  ],
})
export class SharedModule {
}
