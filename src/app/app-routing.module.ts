import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BookingComponent } from './components/booking/booking.component';
import { HeroComponent } from './components/hero/hero.component';
import { MembersComponent } from './components/members/members.component';
import { AuthGuard } from './guard/auth.guard';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { TablesComponent } from './components/tables/tables.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DragdropComponent } from './components/dragdrop/dragdrop.component';
import { PromiseComponent } from './components/promise/promise.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'booking', component: BookingComponent, pathMatch: 'full' },
  { path: 'hero', component: HeroComponent, canActivate: [AuthGuard] },
  { path: 'members', component: MembersComponent, canActivate: [AuthGuard] },
  { path: 'fb', component: AddressFormComponent },
  { path: 'tables', component: TablesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dragdrop', component: DragdropComponent },
  { path: 'promise', component: PromiseComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
