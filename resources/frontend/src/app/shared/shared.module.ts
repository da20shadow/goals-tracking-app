import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageTitleComponent} from "./components/page-elements/page-title/page-title.component";
import {TaskTimePipe} from "./pipes/task-time.pipe";
import {ShortTitlePipe} from "./pipes/short-title.pipe";


@NgModule({
  declarations: [
    PageTitleComponent,
    TaskTimePipe,
    ShortTitlePipe,

  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PageTitleComponent,
    TaskTimePipe,
    ShortTitlePipe,
  ],
})
export class SharedModule {
}
