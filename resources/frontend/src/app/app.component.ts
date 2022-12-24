import {ChangeDetectorRef, Component} from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GoalsApp';

  mobileQuery: MediaQueryList;

  fillerNav = [
    {
      title: 'Goals',
      navLinks: [
        {url: 'goals', name: 'All'},
        {url: 'personal', name: 'Personal'},
        {url: 'financial', name: 'Financial'},
        {url: 'relationship', name: 'Relationship'},
        {url: 'other', name: 'Other'},
      ]
    },
    {
      title: 'Profile',
      navLinks: [
        {url: 'profile', name: 'Profile'},
        {url: 'profile-edit', name: 'Edit Profile'},
        {url: 'settings', name: 'Settings'},
        {url: 'logout', name: 'Logout'},
      ]
    }
  ];


  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
