import {Injectable} from "@angular/core";
import {TargetService} from "../../targets/services/target.service";
import {NotificationService} from "../../core/services/notification.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {TargetPageActions} from "./target-page.actions";
import {catchError, concatMap, filter, from, map, of, switchMap, withLatestFrom} from "rxjs";
import {Store} from "@ngrx/store";
import {targetSelectors} from "./target-selectors";
import {TargetApiActions} from "./target-api.actions";
import {GoalService} from "../../goals/services/goal.service";
import {Router} from "@angular/router";

@Injectable()
export class TargetEffects {

  getTargets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TargetPageActions.get),
      concatMap((action) => {
        return of(action).pipe(
          withLatestFrom(this.store$.select(targetSelectors.selectTargetsLoadStatus)),
          filter(([_,targetsLoadStatus]) => {
            return targetsLoadStatus === 'pending'
          }),
          map(() => TargetPageActions.loadTargets({goalId: action.goalId}))
        )
      })
    )
  });

  loadGoalTargets = createEffect(() => {
    return this.actions$.pipe(
      ofType(TargetPageActions.loadTargets),
      switchMap(({goalId}) => {
        return from(this.goalService.getGoalTargets(goalId)).pipe(
          map((targets) => {
            return TargetApiActions.loadTargetsListSuccess({targets})
          }),
          catchError((err) => {
            return of(TargetApiActions.loadTargetsListFailure({error: err.error.message}))
          })
        )
      })
    )
  })

  getActiveTarget$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TargetPageActions.getActiveTarget),
      concatMap((action) => {
        return of(action).pipe(
          withLatestFrom(this.store$.select(targetSelectors.selectActiveTarget)),
          filter(([_, activeTarget]) => {
            return activeTarget === null
          }),
          map(() => TargetPageActions.loadActiveTarget({targetId:action.targetId}))
        )
      })
    )
  });

  loadActiveTarget$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TargetPageActions.loadActiveTarget),
      switchMap(({targetId}) => from(this.targetService.getTargetById(targetId)).pipe(
        map((target) => {
          return TargetApiActions.updateActiveTargetSuccess({target});
        }),
        catchError((error) => {
          return of(TargetApiActions.updateActiveTargetFailure({error: error.message}));
        })
      )),
    )
  });

  /** Update Active Target */
  updateActiveTarget$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TargetPageActions.updateActiveTarget),
      concatMap(({targetId, changedTarget}) => {
        return from(this.targetService.updateTargetId(targetId, changedTarget)).pipe(
          map((response) => {
            this.notificationService.showSuccessNotification(response.message);
            return TargetApiActions.updateActiveTargetSuccess({target: response.target})
          }),
          catchError((err) => {
            this.notificationService.showErrorNotification(err.error.message);
            return of(TargetApiActions.updateActiveTargetFailure({error:err.error.message}))
          })
        )
      })
    )
  });

  /** Delete Active Target */
  deleteActiveTarget$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TargetPageActions.deleteActiveTarget),
      concatMap(({targetId,goalId}) => {
        return from(this.targetService.deleteTargetId(targetId)).pipe(
          map((response) => {
            this.notificationService.showSuccessNotification(response.message);
            this.route.navigate([`/goals/${goalId}`]);
            return TargetApiActions.deletedActiveTargetSuccess()
          }),
          catchError((err) => {
            this.notificationService.showErrorNotification(err.error.message);
            return of(TargetApiActions.deleteActiveTargetFailure({error:err.error.message}))
          })
        )
      })
    )
  });

  constructor(private actions$: Actions,
              private targetService: TargetService,
              private goalService: GoalService,
              private store$: Store,
              private route: Router,
              private notificationService: NotificationService) {
  }
}
