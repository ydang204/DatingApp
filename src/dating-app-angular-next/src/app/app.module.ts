import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CommonModule } from '@angular/common';
import { BsDropdownModule} from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from '../_components/layout/navbar/navbar.component';
import { FooterComponent } from '../_components/layout/footer/footer.component';
import { ForgotPasswordComponent } from '../_components/auth/forgot-password/forgot-password.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    FontAwesomeModule,
  ],
  declarations: [AppComponent , NavbarComponent , FooterComponent , ForgotPasswordComponent],
  exports: [NavbarComponent, FooterComponent , ForgotPasswordComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
