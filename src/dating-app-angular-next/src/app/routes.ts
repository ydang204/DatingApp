import { Routes } from '@angular/router';
import { HomeComponent } from '@components/home/home.component';
import { RegisterComponent } from '../_components/auth/register/register.component';
import { MemberEditComponent } from '../_components/members/member-edit/member-edit.component';
import { PreventUnsavedChanges } from "../_guards/prevent-unsaved-changes.guard";
import { MemberEditResolver } from "../_resolver/member-edit.resolver";


export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'members/edit', component: MemberEditComponent, resolve: { user: MemberEditResolver },
    canDeactivate: [PreventUnsavedChanges]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
