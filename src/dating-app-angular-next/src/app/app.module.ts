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
import { LayoutModule } from '@components/layout/layout.module';
import { SharedModule } from '@components/shared/shared.module';
import { RegisterComponent } from '@components/auth/register/register.component';

@NgModule({
  declarations: [AppComponent,RegisterComponent,HomeComponent],
  imports: [BrowserModule, HttpClientModule, BrowserAnimationsModule, AppRoutingModule, BsDatepickerModule.forRoot(), LayoutModule, SharedModule],
  providers: [AlertifyService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
