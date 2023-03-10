import {Actions, concatLatestFrom, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AuthService} from "../../auth/services/auth.service";
import {Injectable} from "@angular/core";
import {catchError, filter, from, map, of, switchMap} from "rxjs";
import {UserPageActions} from "./user-page.actions";
import {userSelectors} from "./user-selectors";
import {UserAPIActions} from "./user-api.actions";
import {Router} from "@angular/router";
import {NotificationService} from "../../core/services/notification.service";

@Injectable()
export class UserApiEffects {


  loginCheck$ = createEffect(() => this.actions$.pipe(
    ofType(UserPageActions.loginCheck),
    switchMap(() =>
      from(this.userService.isLoggedIn()).pipe(
        map((isLogged) => {
          if (!isLogged){
            return UserAPIActions.setIsLoggedFailure();
          }
          return UserAPIActions.setIsLoggedSuccess();
        })
      ))
  ));

  getProfile$ = createEffect(() => this.actions$.pipe(
    ofType(UserPageActions.getUser),
    concatLatestFrom(() => this.store$.select(userSelectors.selectIsLoggedIn)),
    filter(([action, isLogged]) => {
      return isLogged === true
    }),
    map(() => UserPageActions.loadUserProfile())
  ));

  loadProfile$ = createEffect(() => this.actions$.pipe(
    ofType(UserPageActions.loadUserProfile),
    concatLatestFrom(() => this.store$.select(userSelectors.selectUser)),
    filter(([action, user]) => {
      return user === null
    }),
    switchMap(() => {
      return (from(this.userService.getUserProfileInfo()).pipe(
        map((user) => UserAPIActions.setUser({user})),
        catchError((error) => {
          return of(UserAPIActions.setIsLoggedFailure());
        })
      ))
    })
  ));

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(UserPageActions.logout),
    switchMap(() =>
      from(this.userService.logout()).pipe(
        map(() => {
          this.notificationService.showSuccessNotification('Successfully Logged Out!');
          this.router.navigate(['login']);
          return UserAPIActions.logoutSuccess()
        }),
      ))
  ))

  constructor(private userService: AuthService,
              private store$: Store,
              private actions$: Actions,
              private router: Router,
              private notificationService: NotificationService) {
  }
}
