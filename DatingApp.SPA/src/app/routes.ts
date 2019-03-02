import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListMembersComponent } from './list-members/list-members.component';
import { MessagesComponent } from './messages/messages.component';
import { LikedMembersComponent } from './liked-members/liked-members.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'members', component: ListMembersComponent },
            { path: 'messages', component: MessagesComponent },
            { path: 'lists', component: LikedMembersComponent },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
