import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';
import { Message } from '../_models/message';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = `${environment.apiUrl}users/`;

  constructor(private httpClient: HttpClient) { }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(this.baseUrl + id);
  }

  updateUser(user: User) {
    return this.httpClient.put(`${this.baseUrl}updateuser`, user);
  }

}
