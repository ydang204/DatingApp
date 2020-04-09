import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from '@components/layout/layout.module';
import { SharedModule } from '@components/shared/shared.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [BrowserModule, AppRoutingModule, LayoutModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
