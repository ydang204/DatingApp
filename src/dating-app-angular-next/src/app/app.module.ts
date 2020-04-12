import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from '@components/layout/layout.module';
import { SharedModule } from '@components/shared/shared.module';
import { RegisterComponent } from '@components/auth/register/register.component';

@NgModule({
  declarations: [AppComponent,RegisterComponent],
  imports: [BrowserModule, AppRoutingModule, BsDatepickerModule.forRoot(), LayoutModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
