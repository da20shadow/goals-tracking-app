import { Component } from '@angular/core';
import {Observable} from "rxjs";
import { Task } from 'src/app/core/models';
import {Store} from "@ngrx/store";
import {taskSelectors} from "../../Store/task-store/task-selectors";
import {TaskPageActions} from "../../Store/task-store/task-page.actions";

@Component({
  selector: 'app-important-tasks',
  templateUrl: './important-tasks.component.html',
  styleUrls: ['./important-tasks.component.scss']
})
export class ImportantTasksComponent {
  title: string = '⚠️Important Tasks';
  importantTasks$: Observable<Task[]>;

  constructor(private store$: Store) {
    this.store$.dispatch(TaskPageActions.getImportantTasks());
    this.importantTasks$ = this.store$.select(taskSelectors.selectImportantTasksList);
  }
}
