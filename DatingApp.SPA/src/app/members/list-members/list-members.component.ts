import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';


@Component({
  selector: 'app-list-members',
  templateUrl: './list-members.component.html',
  styleUrls: ['./list-members.component.css']
})
export class ListMembersComponent implements OnInit {
  users: User[];
  user: User = JSON.parse(localStorage.getItem('user'));
  genders = [{ value: 'male', displayName: 'Male' }, { value: 'female', displayName: 'Female' }];
  userParams: any = {};
  pagination: Pagination;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private alertifyService: AlertifyService
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.users = data.users.result;
      this.pagination = data.users.pagination;
    });

    this.resetFilters(false);
  }

  resetFilters(reloadUser: boolean = true) {
    this.userParams.gender = this.user.gender === 'male' ? 'female' : 'male';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    if (reloadUser) {
      this.loadUsers();
    }
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
      .subscribe((response: PaginatedResult<User[]>) => {
        this.users = response.result;
        this.pagination = response.pagination;
      }, error => {
        this.alertifyService.error(error);
      });
  }

}
