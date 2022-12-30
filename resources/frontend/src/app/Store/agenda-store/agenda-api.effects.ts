import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {TaskService} from "../../tasks/services/task.service";
import {NotificationService} from "../../core/services/notification.service";
import {catchError, concatMap, filter, from, map, of, switchMap, withLatestFrom} from "rxjs";
import {AgendaPageActions} from "./agenda-page.actions";
import {agendaSelectors} from "./agenda-selectors";
import {AgendaAPIActions} from "./agenda-api.actions";

@Injectable()
export class AgendaApiEffects {

  getAgendaTodayTasks$ = createEffect(()=> {
    return this.actions$.pipe(
      ofType(AgendaPageActions.getTodayTasks),
      concatMap((action) => {
        return of(action).pipe(
          withLatestFrom(this.store$.select(agendaSelectors.selectTodayTasksStatus)),
          filter(([_,status])=> {
            return status === 'pending'
          }),
          map(() => AgendaPageActions.loadTodayTasks())
        )
      })
    )
  });

  loadTodayTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AgendaPageActions.loadTodayTasks),
      switchMap(() => {
        return from(this.taskService.getTodayTasks()).pipe(
          map((todayTasks) => {
            return AgendaAPIActions.loadTodayTasksSuccess({todayTasks})
          }),
          catchError(err => {
            return of(AgendaAPIActions.loadTodayTasksFailure({error: err.error.message}))
          })
        )
      })
    )
  });

  getOverdueTasks$ = createEffect(()=> {
    return this.actions$.pipe(
      ofType(AgendaPageActions.getOverdueTasks),
      concatMap((action) => {
        return of(action).pipe(
          withLatestFrom(this.store$.select(agendaSelectors.selectOverdueTasksStatus)),
          filter(([_,status])=> {
            return status === 'pending'
          }),
          map(() => AgendaPageActions.loadOverdueTasks())
        )
      })
    )
  });

  loadOverdueTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AgendaPageActions.loadOverdueTasks),
      switchMap(() => {
        return from(this.taskService.getOverdueTasks()).pipe(
          map((overdueTasks) => {
            return AgendaAPIActions.loadOverdueTasksSuccess({overdueTasks})
          }),
          catchError(err => {
            return of(AgendaAPIActions.loadOverdueTasksFailure({error: err.error.message}))
          })
        )
      })
    )
  });

  getNextTasks$ = createEffect(()=> {
    return this.actions$.pipe(
      ofType(AgendaPageActions.getNextTasks),
      concatMap((action) => {
        return of(action).pipe(
          withLatestFrom(this.store$.select(agendaSelectors.selectNextTasksStatus)),
          filter(([_,status])=> {
            return status === 'pending'
          }),
          map(() => AgendaPageActions.loadNextTasks())
        )
      })
    )
  });

  loadNextTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AgendaPageActions.loadNextTasks),
      switchMap(() => {
        return from(this.taskService.getNextTasks()).pipe(
          map((nextTasks) => {
            return AgendaAPIActions.loadNextTasksSuccess({nextTasks})
          }),
          catchError(err => {
            return of(AgendaAPIActions.loadNextTasksFailure({error: err.error.message}))
          })
        )
      })
    )
  });

  getUnscheduledTasks$ = createEffect(()=> {
    return this.actions$.pipe(
      ofType(AgendaPageActions.getUnscheduledTasks),
      concatMap((action) => {
        return of(action).pipe(
          withLatestFrom(this.store$.select(agendaSelectors.selectUnscheduledTasksStatus)),
          filter(([_,status])=> {
            return status === 'pending'
          }),
          map(() => AgendaPageActions.loadUnscheduledTasks())
        )
      })
    )
  });

  loadUnscheduledTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AgendaPageActions.loadUnscheduledTasks),
      switchMap(() => {
        return from(this.taskService.getUnscheduledTasks()).pipe(
          map((unscheduledTasks) => {
            return AgendaAPIActions.loadUnscheduledTasksSuccess({unscheduledTasks})
          }),
          catchError(err => {
            return of(AgendaAPIActions.loadUnscheduledTasksFailure({error: err.error.message}))
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
