import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {TaskPageActions} from "./task-page.actions";
import {catchError, concatMap, filter, from, map, of, switchMap, withLatestFrom} from "rxjs";
import {TaskService} from "../../tasks/services/task.service";
import {TaskAPIActions} from "./task-api.actions";
import {TargetPageActions} from "../tartgets-store/target-page.actions";
import {targetSelectors} from "../tartgets-store/target-selectors";

@Injectable()
export class TaskApiEffects {

  getTasksListState$ = createEffect(()=> {
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


  constructor(private actions$: Actions,
              private store$: Store,
              private taskService: TaskService) {
  }
}
