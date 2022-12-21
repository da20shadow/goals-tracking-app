import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageTitleComponent} from './components/page-title/page-title.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatSortModule} from "@angular/material/sort";


@NgModule({
  declarations: [
    PageTitleComponent,
    TasksListComponent,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatSortModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
    PageTitleComponent,
    TasksListComponent
  ],
})
export class SharedModule {
}
