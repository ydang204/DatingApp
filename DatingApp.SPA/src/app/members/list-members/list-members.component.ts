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
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers(this.pagination.currentPage, this.pagination.itemsPerPage);
  }

  loadUsers(currentPage: number, itemsPerPage: number): void {
    this.userService.getUsers(currentPage, itemsPerPage)
      .subscribe((response: PaginatedResult<User[]>) => {
        this.users = response.result;
        this.pagination = response.pagination;
      }, error => {
        this.alertifyService.error(error);
      });
  }

}
