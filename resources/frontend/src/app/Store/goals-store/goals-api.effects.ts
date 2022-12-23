import {Injectable} from "@angular/core";
import {Actions, concatLatestFrom, createEffect, ofType} from "@ngrx/effects";
import {GoalPageActions} from "./goal-page.actions";
import {catchError, concatMap, filter, from, map, mergeMap, of, switchMap, withLatestFrom} from "rxjs";
import {ROUTER_NAVIGATION, RouterNavigatedAction} from "@ngrx/router-store";
import {Store} from "@ngrx/store";
import {MatDialog} from "@angular/material/dialog";
import {NotificationService} from "../../core/services/notification.service";
import {goalsListSelectors} from "./goal-selectors";
import {GoalsAPIActions} from "./goal-api.actions";
import {GoalService} from "../../goals/services/goal.service";
import {Router} from "@angular/router";
import {TargetApiActions} from "../tartgets-store/target-api.actions";
import {targetSelectors} from "../tartgets-store/target-selectors";

@Injectable()
export class GoalApiEffects {

  /** Call Load goals list if status pending */
  get$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GoalPageActions.get),
      concatMap((action) => {
        return of(action).pipe(
          withLatestFrom(this.store$.select(goalsListSelectors.selectGoalsListLoadStatus)),
          filter(([_, loadStatus]) => loadStatus === 'pending'),
          map(() => GoalPageActions.loadGoals())
        )
      })
    )
  });
  /** Load goals list */
  loadGoals$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GoalPageActions.loadGoals),
      switchMap(() => from(this.goalService.getAllGoals()).pipe(
        map((goals) => {
          return GoalsAPIActions.loadGoalsSuccess({goals});
        }),
        catchError((error) => {
          //TODO: remove the log!
          console.log('GoalsEffects loadGoal$ Error: ', error);
          return of(GoalsAPIActions.loadGoalsFailure({error: error.message}));
        })
      )),
    )
  });
  /** Add goal to goals list */
  addGoalToList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GoalPageActions.addNewGoal),
      concatMap(({goal}) => {
        return from(this.goalService.saveGoal(goal)).pipe(
          map((response) => {
            this.notificationService.showSuccessNotification(response.message);
            return GoalsAPIActions.addNewGoalSuccess({goal: response.goal})
          }),
          catchError((err) => {
            console.log('err',err)
            this.notificationService.showErrorNotification(err.error.message)
            return of(GoalsAPIActions.addNewGoalFailure({error: err.error.message}))
          })
        )
      })
    )
  });

  /** Reload Goal List After Adding New Goal */
  reloadGoalToListOnAddingNewGoal$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GoalsAPIActions.addNewGoalSuccess),
      concatMap((action) => {
        return of(action).pipe(
          withLatestFrom(this.store$.select(goalsListSelectors.selectGoalsListLoadStatus)),
          filter(([_, loadStatus]) => loadStatus === 'pending'),
          map(() => GoalPageActions.loadGoals())
        )
      })
    )
  });

  /** Reload Goal List After Deleting Goal !DONE WITH REDUCER!*/
  // reloadGoalToListOnDeletingGoal$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(GoalsAPIActions.removeActiveGoalSuccess),
  //     map(() => GoalPageActions.loadGoals())
  //   )
  // });

  /** Update Active goal progress when active target progress is updated! */
  updateActiveGoalProgress$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TargetApiActions.updateActiveTargetSuccess),
      concatMap((action) => {
        return of(action).pipe(
          withLatestFrom(this.store$.select(targetSelectors.selectActiveTarget)),
          filter(([_, activeTarget]) => activeTarget ? activeTarget.progress >= 100 : false),
          map(() => GoalPageActions.goalTargetCompleted())
        )
      })
    )
  });

  // TargetApiActions.deletedActiveTargetSuccess
  /** Update Active goal progress when active target is deleted! */
    //TODO: not works now to make it works!
  updateActiveGoalProgressWhenTargetDeleted$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TargetApiActions.deletedActiveTargetSuccess),
      map(() => GoalPageActions.goalTargetDeleted())
    )
  });

  /** Update Active goal */
  updateActiveGoal$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GoalPageActions.updateActiveGoal),
      concatMap(({goalId, changedGoal}) => {
        return from(this.goalService.updateGoal(goalId, changedGoal)).pipe(
          map((response) => {
            this.notificationService.showSuccessNotification(response.message);
            return GoalsAPIActions.updateActiveGoalSuccess({goal: response.goal})
          }),
          catchError((err) => {
            //TODO: remove the log!
            console.log('GoalsEffects updateActiveGoal$ Error: ', err);
            return of(GoalsAPIActions.updateActiveGoalFailure({error: err.error.message}))
          })
        )
      })
    )
  });

  /** Remove Active goal */
  removeActiveGoal$ = createEffect(() => this.actions$.pipe(
    ofType(GoalPageActions.removeActiveGoal),
    concatMap(({goalId}) => {
      return from(this.goalService.deleteGoal(goalId)).pipe(
        map((response) => {
          this.notificationService.showSuccessNotification(response.message);
          this.router.navigate(['/goals']);
          return GoalsAPIActions.removeActiveGoalSuccess({goalId});
        }),
        catchError((error) => {
          //TODO: remove the log!
          console.log('updateActiveGoal Error:', error);
          return of(error);
        })
      )
    })
  ));

  /** Call Load Active Goal if there is no active goal */
  getActiveGoal$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GoalPageActions.getActiveGoal),
      concatMap((action) => {
        return of(action).pipe(
          withLatestFrom(this.store$.select(goalsListSelectors.selectActiveGoal)),
          filter(([_, activeGoal]) => {
            return activeGoal === null
          }),
          map(() => GoalPageActions.loadActiveGoal({goalId:action.goalId}))
        )
      })
    )
  });

  /** Load Active goal */
  loadGoalActiveGoal$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GoalPageActions.loadActiveGoal),
      switchMap(({goalId}) => from(this.goalService.getGoalById(goalId)).pipe(
        map((goal) => {
          return GoalsAPIActions.updateActiveGoalSuccess({goal});
        }),
        catchError((error) => {
          return of(GoalsAPIActions.updateActiveGoalFailure({error: error.message}));
        })
      )),
    )
  });

  //TODO: remove them because they are too slow there is a faster way!
  /** Set Active goal */
  // setActiveGoal$ = createEffect(() => this.actions$.pipe(
  //   ofType(ROUTER_NAVIGATION),
  //   filter((r: RouterNavigatedAction) => {
  //     return r.payload.routerState.url.startsWith('/goals/');
  //   }),
  //   map((route)=> {
  //     const goalId = parseInt(route.payload.routerState.url.replace('/goals/', ''));
  //     return {goalId}
  //   }),
  //   switchMap(({goalId}) => {
  //     return from(this.goalService.getGoalById(goalId)).pipe(
  //       map((goal) => {
  //         return GoalsAPIActions.setActiveGoalSuccess({goal});
  //       }),
  //       catchError(err => {
  //         return of(GoalsAPIActions.setActiveGoalFailure({error: err.error.message}))
  //       })
  //     )
  //   })
  // ));

  // setActiveGoalSuccess$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(GoalPageActions.setActiveGoal),
  //     concatMap((action) => {
  //       return of(action).pipe(
  //         withLatestFrom(this.store$.select(goalsListSelectors.selectGoalsList)),
  //         map(([a, goalsList]) => {
  //           const goal = goalsList.find(g => g.id === a.goalId);
  //           if (goal){
  //             return GoalsAPIActions.setActiveGoalSuccess({goal})
  //           }else {
  //             return from(this.goalService.getGolById(a.goalId)).pipe(
  //               map((response) => {
  //                 return GoalsAPIActions.setActiveGoalSuccess({goal:response.goal})
  //               }),
  //               catchError((err) => {
  //                 return of(GoalsAPIActions.setActiveGoalFailure({error: err.error.message}))
  //               })
  //             )
  //           }
  //         }),
  //       )
  //     })
  //   )
  // });

  constructor(private actions$: Actions,
              private store$: Store,
              private goalService: GoalService,
              private dialog: MatDialog,
              private router: Router,
              private notificationService: NotificationService) {
  }

}
