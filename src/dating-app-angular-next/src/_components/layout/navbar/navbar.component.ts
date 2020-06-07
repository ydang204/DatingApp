import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { AlertifyService } from '../../../_services/alertify.service';
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
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login() {
    this.authService.login(this.user).subscribe(next => {
      this.alertify.success('Successfully login');
    }, error => {
      console.log(error);
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.router.navigate(['/home']);
  }

}
