import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { faUser , faSignOutAlt , faBell , faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  faUser = faUser ;
  faSignOutAlt = faSignOutAlt;
  faBell = faBell;
  faEnvelope = faEnvelope;

  number = 20;

  user: any = {};
  photoUrl: String;

  constructor(
    private router: Router
  ) { }

  ngOnInit() { }

  login() {
    console.log('success');
  }

  loggedIn() {
    return true;
  }

  logout() {
    this.router.navigate(['/home']);
  }

}
