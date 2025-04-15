import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { MeetingsComponent } from './meetings/meetings.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'clientslist', component: ClientsListComponent},
    {path: 'meetings', component: MeetingsComponent}
];
