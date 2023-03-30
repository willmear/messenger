import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component'
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { MessengerComponent } from './messenger/messenger.component';

// For role specific pages add after component :
//, canActivate[AuthGuard], data:{roles:'USER' }

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'messenger', component: MessengerComponent, canActivate:[AuthGuard], data: {roles:'USER'} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
