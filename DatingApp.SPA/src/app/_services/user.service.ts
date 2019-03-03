import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';


const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.apiUrl + 'users/';

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl + 'getusers', httpOptions);
  }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(this.baseUrl + 'getuser/' + id, httpOptions);
  }
}
