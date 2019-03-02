import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private baseUrl = 'http://localhost:5000/api/auth/register';

  @Output() cancleRegister = new EventEmitter();

  model: any = {};

  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      this.alertifyService.success('Registeration successfully');
    }, err => {
      this.alertifyService.error(err);
    });
  }

  cancel() {
    this.cancleRegister.emit(false);
  }
}
