import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {Task, TaskPriority, TaskStatus} from 'src/app/core/models';
import {Store} from "@ngrx/store";
import {TaskPageActions} from "../../Store/task-store/task-page.actions";
import {taskSelectors} from "../../Store/task-store/task-selectors";
import {NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {TaskService} from "../services/task.service";
import {NotificationService} from "../../core/services/notification.service";
import {TaskAPIActions} from "../../Store/task-store/task-api.actions";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {TargetPageActions} from "../../Store/tartgets-store/target-page.actions";
import {Title} from "@angular/platform-browser";
import {DateFn} from "../../shared/utils/date-fn";

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        transform: 'scaleY(0.01)', opacity: 0
      })),
      transition('void <=> *', animate(400)),
    ]),
    trigger('fadeTaskInOut', [
      state('void', style({
        transform: 'scaleY(0.01)', opacity: 0
      })),
      transition('void <=> *', animate(800)),
    ]),
  ]
})
export class TaskDetailsComponent {

  activeTask$: Observable<Task|null>;
  // tasksList$: Observable<Task[]>;
  taskStatuses = Object.values(TaskStatus);
  taskPriority = Object.values(TaskPriority);
  TaskPriorityNames = TaskPriority;
  editTask: boolean = false;

  constructor(private store$: Store, private taskService: TaskService,
              private notificationService: NotificationService,
              private activatedRoute: ActivatedRoute,
              private title: Title, public dateFn: DateFn) {
    this.title.setTitle('Task Details - GoalsApp');
    this.activeTask$ = this.store$.select(taskSelectors.selectActiveTask);
    //TODO: implement subtasks!
    // this.tasksList$ = this.store$.select(taskSelectors.selectTaskTasksList);
  }

  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      const taskId = params['id'];
      this.store$.dispatch(TaskPageActions.getActiveTask({taskId}));
    });
    //TODO: implement subtasks!
    // this.store$.dispatch(TaskPageActions.loadTaskTaskList())
  }

  ngOnDestroy(){
    this.store$.dispatch(TaskPageActions.clear());
  }

  editTaskFormHandler(editTaskForm: NgForm, task: Task) {
    if (editTaskForm.invalid){
      this.notificationService.showErrorNotification('Invalid Form Fields!');
      return;
    }
    const formData = editTaskForm.value;
    let changedTask = {};

    if (formData.title && formData.title !== task.title){
      changedTask = {...changedTask,title: formData.title}
    }
    if (formData.description && formData.description !== task.description){
      changedTask = {...changedTask,description: formData.description}
    }
    if (formData.start_date && formData.start_date + ' 00:00:00' !== task.start_date){
      changedTask = {...changedTask,start_date: formData.start_date}
    }
    if (formData.end_date && formData.end_date + ' 00:00:00' !== task.end_date){
      changedTask = {...changedTask,end_date: formData.end_date}
    }
    changedTask = {...changedTask,id:task.id}

    this.store$.dispatch(TaskPageActions.updateActiveTask({taskId:task.id,changedTask}))

    this.editTask = false;
  }

  deleteTask(task: Task) {

  }

  updateTaskId(taskId: number | null | undefined,
               status: string | TaskStatus | null | undefined,
               type: string, field:string) {
    //TODO: status is needed if I implement separate tasks in separate tables by status
    // for deciding in which status list to add the task after the change!
    if (!taskId || !type || !field || !status){
      alert('Invalid Task Update Request!');
      return;
    }
    const changedTask = {id:taskId, [type]: field }

    this.taskService.updateTask(taskId,changedTask).subscribe({
      next: (response) => {
        this.notificationService.showSuccessNotification(response.message);
        this.store$.dispatch(TaskAPIActions.updateActiveTaskSuccess({changedTask: response.task}));
      },
      error: (er) => {
        this.notificationService.showErrorNotification(er.error.message);
      }
    })

  }
}
