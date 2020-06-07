import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../../_models/user';
import { AlertifyService } from '@services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../_services/user.service';
import { AuthService } from '../../../_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  user: User;
  photoUrl: string;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertifyService: AlertifyService,
    private userService: UserService,
    private authService: AuthService
  ) {  }

  ngOnInit() {
    // this.userService.getUser(this.authService
    //   .decodedToken.nameid).subscribe((data) => this.user = data);

    this.activatedRoute.data.subscribe(data => {
      this.user = data.user;
    });

    this.authService.currentPhotoUrl.subscribe(url => this.photoUrl = url);
  }

  updateUser() {
    this.user.id = this.authService.decodedToken.nameid;
    this.userService.updateUser(this.user)
      .subscribe(next => {
        this.editForm.reset(this.user);
        this.alertifyService.success('Profile updated successfully');
      }, error => {
        this.alertifyService.error(error);
      });
  }

  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }

}
