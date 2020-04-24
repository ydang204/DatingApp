import { Routes } from '@angular/router';
import { HomeComponent } from '../_components/home/home.component';
import { RegisterComponent } from '../_components/auth/register/register.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers : 'always',
    children : [
      {path: 'register', component: RegisterComponent}
    ]

  }
];
