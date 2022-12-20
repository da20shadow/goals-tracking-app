import {CanActivateFn, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";

export const isLoggedInGuardFn: CanActivateFn = () => {
  const router = inject(Router);
  const isLogged = inject(AuthService).isLoggedIn();
  if (!isLogged){
    router.navigate(['no-access']).then(r => {
      console.log(r)})
  }
  return isLogged;
}
