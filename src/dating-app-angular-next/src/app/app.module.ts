import { AuthService } from '@services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HomeComponent } from '@components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertifyService } from '@services/alertify.service';
import { CommonModule } from '@angular/common';
import { BsDropdownModule} from 'ngx-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedModule } from '@components/shared/shared.module';
import { LayoutModule } from '@components/layout/layout.module';
import { RegisterComponent } from '@components/auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    BsDropdownModule.forRoot(),
    FontAwesomeModule,
    BrowserModule, 
    HttpClientModule, 
    BrowserAnimationsModule, 
    AppRoutingModule, 
    BsDatepickerModule.forRoot(), 
    LayoutModule, 
    SharedModule
  ],
  declarations: [AppComponent , NavbarComponent , FooterComponent , ForgotPasswordComponent],
  exports: [],
  providers: [AlertifyService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
