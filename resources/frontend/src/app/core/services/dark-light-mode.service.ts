import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkLightModeService {

  constructor() { }

  checkUserPreferredMode(){

    const darkMode = this.isDarkModeEnabled();

    if (darkMode || (!('theme' in localStorage)
      && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      return true;
    } else {
      document.documentElement.classList.remove('dark');
      return false;
    }
  }

  enableDarkTheme(){
    localStorage.removeItem('theme')
    localStorage.setItem('theme','dark')
    document.documentElement.classList.add('dark')
  }

  enableLightTheme(){
    localStorage.removeItem('theme')
    localStorage.setItem('theme','light')
    document.documentElement.classList.remove('dark')
  }

  isDarkModeEnabled(){
    const theme = localStorage.getItem('theme');
    return !!(theme && theme === 'dark');
  }

}
