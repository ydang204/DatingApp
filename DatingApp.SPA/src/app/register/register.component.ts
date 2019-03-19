import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancleRegister = new EventEmitter();
  private baseUrl = 'http://localhost:5000/api/auth/register';
  registerForm: FormGroup;

  model: any = {};

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm(): void {
    this.registerForm = this.formBuilder.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
        validators: this.passwordMatchValidator
      });
  }

  passwordMatchValidator(f: FormGroup) {
    return f.get('password').value === f.get('confirmPassword').value ? null : { missmatch: true };
  }

  register() {
    // this.authService.register(this.model).subscribe(() => {
    //   this.alertifyService.success('Registeration successfully');
    // }, err => {
    //   this.alertifyService.error(err);
    // });
    console.log(this.registerForm.value);
  }

  cancel() {
    this.cancleRegister.emit(false);
  }
}
