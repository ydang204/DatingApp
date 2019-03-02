import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth/';

  private jwtHelper = new JwtHelperService();

  constructor(private httpClient: HttpClient) { }

  login(user: any) {
    return this.httpClient.post(this.baseUrl + 'login', user)
      .pipe(map((response: any) => {
        if (response) {
          localStorage.setItem('token', response.token);
        }
      }));
  }

  register(model: any) {
    return this.httpClient.post(this.baseUrl + 'register', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }


}
