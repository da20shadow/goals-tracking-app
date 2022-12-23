import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {TaskService} from "../../tasks/services/task.service";
import {NotificationService} from "../../core/services/notification.service";
import {TaskPageActions} from "../task-store/task-page.actions";
import {catchError, concatMap, filter, from, map, of, switchMap, withLatestFrom} from "rxjs";
import {taskSelectors} from "../task-store/task-selectors";
import {TaskAPIActions} from "../task-store/task-api.actions";
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
          withLatestFrom(this.store$.select(agendaSelectors.selectAgendaStateStatus)),
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

  constructor(private actions$: Actions,
              private store$: Store,
              private taskService: TaskService,
              private notificationService: NotificationService) {
  }
}
