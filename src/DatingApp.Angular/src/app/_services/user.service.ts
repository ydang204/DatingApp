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

  getUsers(page?: number, pageSize?: number, userParams?: any, likeParams?: any): Observable<PaginatedResult<User[]>> {

    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

    let params = new HttpParams();

    if (page != null && pageSize != null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', pageSize.toString());
    }

    if (userParams != null) {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy);
    }


    if (likeParams === 'Likers') {
      params = params.append('Likers', 'true');
    }

    if (likeParams === 'Likees') {
      params = params.append('Likees', 'true');
    }


    return this.httpClient.get<User[]>(`${this.baseUrl}getusers`, { observe: 'response', params })
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
    return this.httpClient.put(`${this.baseUrl}updateuser`, user);
  }

  setMainPhoto(userId: number, id: number) {
    return this.httpClient.post(`${this.baseUrl}${userId}/photos/${id}/setmainphoto`, {});
  }

  deletePhoto(userId: number, id: number) {
    return this.httpClient.delete(`${this.baseUrl}${userId}/photos/${id}/delete`);
  }

  sendLike(userId: number, recipientId: number) {
    return this.httpClient.post(`${this.baseUrl}${userId}/like/${recipientId}`, {});
  }

  getMessages(id: number, page?: number, itemPerPage?: number, messageContainter?: string) {
    const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<Message[]>();

    let params = new HttpParams();

    params = params.append('messageContainter', messageContainter);

    if (page != null && itemPerPage != null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemPerPage.toString());
    }

    return this.httpClient.get<Message[]>(`${this.baseUrl}${id}/messages`, { observe: 'response', params })
      .pipe(map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      }));
  }

}
