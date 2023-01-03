import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {TaskPageActions} from "./task-page.actions";
import {catchError, concatMap, filter, from, map, of, switchMap, withLatestFrom} from "rxjs";
import {TaskService} from "../../tasks/services/task.service";
import {TaskAPIActions} from "./task-api.actions";
import {TargetPageActions} from "../tartgets-store/target-page.actions";
import {targetSelectors} from "../tartgets-store/target-selectors";
import {taskSelectors} from "./task-selectors";
import {NotificationService} from "../../core/services/notification.service";

@Injectable()
export class TaskApiEffects {

  getActiveTaskState$ = createEffect(()=> {
    return this.actions$.pipe(
      ofType(TaskPageActions.getActiveTask),
      concatMap((action) => {
        return of(action).pipe(
          withLatestFrom(this.store$.select(taskSelectors.selectActiveTask)),
          filter(([_,task])=> {
            return task === null || task.id !== action.taskId
          }),
          map(() => TaskPageActions.loadActiveTask({taskId: action.taskId}))
        )
      })
    )
  });

  loadActiveTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskPageActions.loadActiveTask),
      switchMap(({taskId}) => {
        return from(this.taskService.getTaskById(taskId)).pipe(
          map((task) => {
            return TaskAPIActions.loadActiveTaskSuccess({task})
          }),
          catchError(err => {
            return of(TaskAPIActions.loadActiveTaskFailure({error: err.error.message}))
          })
        )
      })
    )
  });

  updateActiveTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskPageActions.updateActiveTask),
      concatMap(({taskId, changedTask}) => {
        return from(this.taskService.updateTask(taskId, changedTask)).pipe(
          map((response) => {
            this.notificationService.showSuccessNotification(response.message);
            return TaskAPIActions.updateActiveTaskSuccess({changedTask: response.task})
          }),
          catchError((err) => {
            return of(TaskAPIActions.updateActiveTaskFailure({error: err.error.message}))
          })
        )
      })
    )
  });

  getTargetTasksList$ = createEffect(()=> {
    return this.actions$.pipe(
      ofType(TargetPageActions.getActiveTargetTasks),
      concatMap((action) => {
        return of(action).pipe(
          withLatestFrom(this.store$.select(targetSelectors.selectActiveTarget)),
          filter(([_,target])=> {
            return target === null || target.id !== action.targetId
          }),
          map(() => TaskPageActions.loadTargetTasks({targetId: action.targetId}))
        )
      })
    )
  });

  loadTargetTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskPageActions.loadTargetTasks),
      switchMap(({targetId}) => {
        return from(this.taskService.getTargetTasksById(targetId)).pipe(
          map((tasks) => {
            return TaskAPIActions.loadTargetTasksSuccess({tasks})
          }),
          catchError(err => {
            return of(TaskAPIActions.loadTargetTasksFailure({error: err.error.message}))
          })
        )
      })
    )
  });

  getUrgentTasksList$ = createEffect(()=> {
    return this.actions$.pipe(
      ofType(TaskPageActions.getUrgentTasks),
      concatMap((action) => {
        return of(action).pipe(
          withLatestFrom(this.store$.select(taskSelectors.selectUrgentTasksStateStatus)),
          filter(([_,status])=> {
            return status === 'pending'
          }),
          map(() => TaskPageActions.loadUrgentTasks())
        )
      })
    )
  });

  loadUrgentTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskPageActions.loadUrgentTasks),
      switchMap(() => {
        return from(this.taskService.getUrgentTasks()).pipe(
          map((tasks) => {
            return TaskAPIActions.loadUrgentTasksSuccess({tasks})
          }),
          catchError(err => {
            return of(TaskAPIActions.loadUrgentTasksFailure({error: err.error.message}))
          })
        )
      })
    )
  });

  getImportantTasksList$ = createEffect(()=> {
    return this.actions$.pipe(
      ofType(TaskPageActions.getImportantTasks),
      concatMap((action) => {
        return of(action).pipe(
          withLatestFrom(this.store$.select(taskSelectors.selectImportantTasksStateStatus)),
          filter(([_,status])=> {
            return status === 'pending'
          }),
          map(() => TaskPageActions.loadImportantTasks())
        )
      })
    )
  });

  loadImportantTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskPageActions.loadImportantTasks),
      switchMap(() => {
        return from(this.taskService.getImportantTasks()).pipe(
          map((tasks) => {
            return TaskAPIActions.loadImportantTasksSuccess({tasks})
          }),
          catchError(err => {
            return of(TaskAPIActions.loadImportantTasksFailure({error: err.error.message}))
          })
        )
      })
    )
  });

  constructor(private actions$: Actions,
              private store$: Store,
              private taskService: TaskService,
              private notificationService: NotificationService) {
  }
}
