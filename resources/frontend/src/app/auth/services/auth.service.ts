import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, tap} from "rxjs";
import {Store} from "@ngrx/store";
import {User, UserApiResponse} from "../../core/models";
import {ApiUrls} from "../../shared/constants/ApiUrls";

interface UserRegistration {
  username:string;
  email:string;
  password:string;
  password_confirmation:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  get token(): any {
    return localStorage.getItem('token');
  }

  constructor(private http: HttpClient, private store: Store) {
    this._isLoggedIn$.next(!!this.token);
  }

  login(email: string, password: string){
    return this.http.post<UserApiResponse>(ApiUrls.LOGIN, {email, password}).pipe(
      tap((response) => {
        this._isLoggedIn$.next(true);
        localStorage.setItem('token',response.user.token);
        this.store.dispatch(UserAPIActions.loginSuccess({user:response.user}));
      })
    )
  }

  logout(){
    return this.http.post<UserApiResponse>(ApiUrls.LOGOUT, {}).pipe(
      tap(r =>
        this.removeToken()
      )
    );
  }

  async isLoggedIn(): Promise<boolean>{
    if (!this.getToken()){
      throw {error: 'Not Logged In!'}
    }
    return !!this.getToken();
  }

  getToken() {
    const token = localStorage.getItem('token');
    return token ? token : undefined;
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  register(regForm: any) {
    const {username,email,pass} = regForm;
    const {password,rePassword} = pass;

    const regFormData: UserRegistration = {
      username,
      email,
      password,
      password_confirmation: rePassword
    }

    return this.http.post<UserApiResponse>(ApiUrls.REGISTER,regFormData);
  }

  saveUser(user: User){
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserProfileInfo() {
    return this.http.get<User>(ApiUrls.PROFILE);
  }

  updateProfile(user: User) {
    return this.http.patch<UserApiResponse>(ApiUrls.PROFILE_UPDATE,user);
  }

  deleteAccount() {
    return this.http.delete<UserApiResponse>(ApiUrls.PROFILE_DELETE);
  }

}
