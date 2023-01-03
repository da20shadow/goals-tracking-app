import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TaskDetailsComponent} from "./task-details/task-details.component";


const routes: Routes = [
  {path: 'all',loadChildren: () =>
  import('./all-tasks/all-tasks.module').then(m => m.AllTasksModule)},
  {path: 'urgent',loadChildren: () =>
      import('./urgent-tasks/urgent-tasks.module').then(m => m.UrgentTasksModule)},
  {path: 'important',loadChildren: () =>
      import('./important-tasks/important-tasks.module').then(m => m.ImportantTasksModule)},
  {path: ':id', component: TaskDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
