import { AuthService } from '@services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TimeAgoPipe } from 'time-ago-pipe';


import { HomeComponent } from '@components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertifyService } from '@services/alertify.service';
import { SharedModule } from '@components/shared/shared.module';
import { RegisterComponent } from '@components/auth/register/register.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../_components/layout/navbar/navbar.component';
import { MemberEditComponent } from '../_components/members/member-edit/member-edit.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [AppComponent, RegisterComponent, HomeComponent, NavbarComponent, MemberEditComponent, TimeAgoPipe],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    FontAwesomeModule,
    SharedModule,
    JwtModule.forRoot({
      // Use this config to globally add jwt to request
      // https://github.com/auth0/angular2-jwt#usage-injection
      config: {
         tokenGetter,
         whitelistedDomains: ['localhost:5000'],
         blacklistedRoutes: ['localhost:5000/api/auth']
      }
   })
  ],
  providers: [AlertifyService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule { }
