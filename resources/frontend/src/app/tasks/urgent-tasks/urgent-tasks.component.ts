import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {Task, TaskPriority} from 'src/app/core/models';
import {Store} from "@ngrx/store";
import {taskSelectors} from "../../Store/task-store/task-selectors";
import {TaskPageActions} from "../../Store/task-store/task-page.actions";

@Component({
  selector: 'app-urgent-tasks',
  templateUrl: './urgent-tasks.component.html',
  styleUrls: ['./urgent-tasks.component.scss']
})
export class UrgentTasksComponent {
  urgentTasks$: Observable<Task[]>;
  title: string = '🔥 Urgent Tasks';
  TaskPriority = TaskPriority;

  constructor(private store$: Store) {
    this.store$.dispatch(TaskPageActions.getUrgentTasks());
    this.urgentTasks$ = this.store$.select(taskSelectors.selectUrgentTasksList)
  }
}
