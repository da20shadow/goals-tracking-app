import { Component } from '@angular/core';
import {GlobalClasses} from "../../../shared/styles/global-classes";
import {AuthService} from "../../../auth/services/auth.service";
import {Title} from "@angular/platform-browser";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {userSelectors} from "../../../Store/user-store/user-selectors";
import {UserPageActions} from "../../../Store/user-store/user-page.actions";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  classes = GlobalClasses;
  isLogged$;

  constructor(private titleService: Title,
              private auth: AuthService,
              private store$: Store,
              private route: Router) {
    this.titleService.setTitle('Home - GoalsApp');
    this.isLogged$ = this.store$.select(userSelectors.selectIsLoggedIn);
    this.store$.dispatch(UserPageActions.loginCheck());
  }

  ngOnInit() {
    this.route.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        this.store$.dispatch(UserPageActions.loginCheck());
      }
    })
  }
}
