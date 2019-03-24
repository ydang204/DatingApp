import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListMembersComponent } from './members/list-members/list-members.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { MemberDetailResolver } from './_resolver/member-detail.resolver';
import { MemberListResolver } from './_resolver/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolver/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ListsResolver } from './_resolver/lists-resolver';
import { ListsComponent } from './lists/lists.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'members', component: ListMembersComponent, resolve: { users: MemberListResolver } },
            {
                path: 'members/edit', component: MemberEditComponent, resolve: { user: MemberEditResolver },
                canDeactivate: [PreventUnsavedChanges]
            },
            { path: 'members/:id', component: MemberDetailsComponent, resolve: { user: MemberDetailResolver } },
            { path: 'messages', component: MessagesComponent },
            { path: 'lists', component: ListsComponent, resolve: { users: ListsResolver } },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
