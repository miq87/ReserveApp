import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MembersComponent } from './components/members/members.component';
import { PromiseComponent } from './components/promise/promise.component';
import { AddNewHotelComponent } from './components/add-new-hotel/add-new-hotel.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { HotelGeneratorComponent } from './components/hotel-generator/hotel-generator.component';
import { RegisterComponent } from './components/register/register.component';
import { HotelDetailComponent } from './components/hotels/hotel-detail/hotel-detail.component';
import { Error404Component } from './components/error404/error404.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard/';
import { MyReservationsComponent } from './components/my-reservations/my-reservations.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  { path: '', redirectTo: 'hotels', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'members', component: MembersComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'promise', component: PromiseComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'add', component: AddNewHotelComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'hotels', component: HotelsComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'hotels/:id', component: HotelDetailComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'generator', component: HotelGeneratorComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'my-reservations', component: MyReservationsComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AngularFireAuthGuard] },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
