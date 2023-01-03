import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {Task, TaskStatus} from 'src/app/core/models';
import {Store} from "@ngrx/store";
import {taskSelectors} from "../../Store/task-store/task-selectors";
import {TaskService} from "../services/task.service";

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.scss']
})
export class AllTasksComponent {
  // inProgressTasks$: Observable<Task[]>;
  inProgressTasks: Task[] = [];
  todoTasks: Task[] = [];
  inRevisionTasks: Task[] = [];
  completedTasks: Task[] = [];

  constructor(private taskService: TaskService) {
    this.taskService.getAll().subscribe({
      next: (tasks) => {
        if (tasks){
          this.inProgressTasks = tasks.filter(t =>
            t.status === TaskStatus.IN_PROGRESS);
          this.todoTasks = tasks.filter(t =>
            t.status === TaskStatus.TO_DO);
          this.inRevisionTasks = tasks.filter(t =>
            t.status === TaskStatus.IN_Revision);
          this.completedTasks = tasks.filter(t =>
            t.status === TaskStatus.COMPLETED);
        }
      },
      error: (err) => {

      }
    })
  }

  // constructor(private store$: Store) {
  //   this.store$.dispatch(getTasksInProgress());
  //   this.inProgressTasks$ = this.store$.select(taskSelectors.selectTasksInProgress);
  // }


}
