import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl + 'auth/';
  private jwtHelper = new JwtHelperService();
  decodedToken: any;
  token: any;
  currentUser: User;
  photoUrl = new BehaviorSubject('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private httpClient: HttpClient) { }

  login(user: any) {
    return this.httpClient.post(this.baseUrl + 'login', user)
      .pipe(map((response: any) => {
        if (response) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.decodedToken = this.jwtHelper.decodeToken(response.token);
          this.currentUser = response.user;
          this.changeMemberPhoto(this.currentUser.photoUrl);
        }
      }));
  }

  register(user: User) {
    return this.httpClient.post(this.baseUrl + 'register', user);
  }

  loggedIn() {
    this.token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(this.token);
  }

  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }


}
