import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { User } from '../_models/user';
import { Observable, of } from 'rxjs';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { catchError } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class ListsResolver implements Resolve<User[]> {
    pageNumber = 1;
    pageSize = 6;
    likeParams = 'Likers';

    constructor(
        private userService: UserService,
        private router: Router,
        private alertify: AlertifyService
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers(this.pageNumber, this.pageSize, null, this.likeParams).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
