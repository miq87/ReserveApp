import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeroComponent } from './components/hero/hero.component';
import { MembersComponent } from './components/members/members.component';

const routes: Routes = [
  { path: '', redirectTo: 'hero', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'hero', component: HeroComponent },
  { path: 'members', component: MembersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
