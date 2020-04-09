import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {

  forgotpasswordForm: FormGroup;
  confirmpasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createForms();
    this.confirm();
  }

  createForms(): void {
    this.forgotpasswordForm = this.fb.group({
      email: ['', Validators.required]
    });
  }

  forgot() {
    console.log(this.forgotpasswordForm.get('email').value);
  }

  cancel() {
    console.log('success cancel');
  }

  confirm(): void {
    this.confirmpasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
        validators: this.passwordMatchValidator
      });
  }

  passwordMatchValidator(f: FormGroup) {
    return f.get('password').value === f.get('confirmPassword').value ? null : { missmatch: true };
  }

  confirmpassword() {
    console.log('success confirm')
  }

  verify() {
    return true;
  }

  ngOnInit() { }
}
