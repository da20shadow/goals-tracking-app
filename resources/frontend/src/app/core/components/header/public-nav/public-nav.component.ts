import { Component } from '@angular/core';
import {GlobalClasses} from "../../../../shared/styles/global-classes";

@Component({
  selector: 'app-public-nav',
  templateUrl: './public-nav.component.html',
  styleUrls: ['./public-nav.component.scss']
})
export class PublicNavComponent {

  classes = GlobalClasses;
  publicNavLinks = [
    {url: '/', name: 'Home'},
    {url: 'faq', name: 'FAQ'},
    {url: 'about', name: 'About'},
    {url: 'contact-us', name: 'Contact us'},
    {url: 'login', name: 'Login'},
    {url: 'register', name: 'Register'},
  ]
}
