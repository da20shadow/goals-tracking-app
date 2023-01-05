import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DateTimePickerComponent} from './date-time-picker.component';
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    DateTimePickerComponent
  ],
  exports: [
    DateTimePickerComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
  ]
})
export class DateTimePickerModule {
}
