import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  user: any = {};

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.user).subscribe(next => {
      this.alertify.success('Successfully login');
    }, error => {
      console.log(error);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('Logged out');
  }

}
