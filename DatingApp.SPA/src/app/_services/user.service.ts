import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.apiUrl + 'users/';

  constructor(private httpClient: HttpClient) { }

  getUsers(page?: number, pageSize?: number): Observable<PaginatedResult<User[]>> {

    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

    let params = new HttpParams();

    if (page != null && pageSize != null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', pageSize.toString());
    }

    return this.httpClient.get<User[]>(this.baseUrl + 'getusers', { observe: 'response', params })
      .pipe(map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('pagination'));
        }
        return paginatedResult;
      }));
  }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(this.baseUrl + id);
  }

  updateUser(user: User) {
    return this.httpClient.put(this.baseUrl + 'updateuser', user);
  }

  setMainPhoto(userId: number, id: number) {
    return this.httpClient.post(this.baseUrl + userId + '/photos/' + id + '/setmainphoto', {});
  }

  deletePhoto(userId: number, id: number) {
    return this.httpClient.delete(this.baseUrl + userId + '/photos/' + id + '/delete');
  }
}
