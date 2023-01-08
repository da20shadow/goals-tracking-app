import {Component} from '@angular/core';
import {userSelectors} from "./Store/user-store/user-selectors";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GoalsApp';
  isLogged$;
  constructor(private store$: Store) {
    this.isLogged$ = this.store$.select(userSelectors.selectIsLoggedIn);
  }
}
