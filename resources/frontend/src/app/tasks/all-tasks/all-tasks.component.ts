import { Component } from '@angular/core';
import {Observable} from "rxjs";
import { Task } from 'src/app/core/models';
import {Store} from "@ngrx/store";
import {taskSelectors} from "../../Store/task-store/task-selectors";

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.scss']
})
export class AllTasksComponent {
  // inProgressTasks$: Observable<Task[]>;
  todoTasks = [
    {id:1,start_date:'', created_at:'', updated_at: '', user_id:1, description: '',target_id:0, title: 'Task title 1',status: 'To Do', priority: 'Low', end_date: '2022-19-12'},
    {id:1,start_date:'', created_at:'', updated_at: '', user_id:1, description: '',target_id:0, title: 'Task title 2',status: 'To Do', priority: 'Low', end_date: '2022-19-12'},
    {id:1,start_date:'', created_at:'', updated_at: '', user_id:1, description: '',target_id:0, title: 'Task title 3',status: 'To Do', priority: 'High', end_date: '2022-19-12'},
    {id:1,start_date:'', created_at:'', updated_at: '', user_id:1, description: '',target_id:0, title: 'Task title 4',status: 'To Do', priority: 'Urgent', end_date: '2022-19-12'},
    {id:1,start_date:'', created_at:'', updated_at: '', user_id:1, description: '',target_id:0, title: 'Task title 5',status: 'To Do', priority: 'Low', end_date: '2022-19-12'},
  ]
  inProgressTasks = [
    {id:1,start_date:'', created_at:'', updated_at: '', user_id:1, description: '',target_id:0, title: 'Task title 1',status: 'In Progress', priority: 'Low', end_date: '2022-19-12'},
    {id:1,start_date:'', created_at:'', updated_at: '', user_id:1, description: '',target_id:0, title: 'Task title 2',status: 'In Progress', priority: 'High', end_date: '2022-19-12'},
    {id:1,start_date:'', created_at:'', updated_at: '', user_id:1, description: '',target_id:0, title: 'Task title 3',status: 'In Progress', priority: 'High', end_date: '2022-19-12'},
    {id:1,start_date:'', created_at:'', updated_at: '', user_id:1, description: '',target_id:0, title: 'Task title 4',status: 'In Progress', priority: 'Low', end_date: '2022-19-12'},
    {id:1,start_date:'', created_at:'', updated_at: '', user_id:1, description: '',target_id:0, title: 'Task title 5',status: 'In Progress', priority: 'Urgent', end_date: '2022-19-12'},
  ];

  // constructor(private store$: Store) {
  //   this.store$.dispatch(getTasksInProgress());
  //   this.inProgressTasks$ = this.store$.select(taskSelectors.selectTasksInProgress);
  // }


}
