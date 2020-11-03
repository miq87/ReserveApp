import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MembersComponent } from './components/members/members.component';
import { AuthGuard } from './guard/auth.guard';
import { PromiseComponent } from './components/promise/promise.component';
import { AddNewHotelComponent } from './components/add-new-hotel/add-new-hotel.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { HotelGeneratorComponent } from './components/hotel-generator/hotel-generator.component';
import { RegisternewComponent } from './components/registernew/registernew.component';
import { HotelDetailComponent } from './components/hotels/hotel-detail/hotel-detail.component';
import { Error404Component } from './components/error404/error404.component';

const routes: Routes = [
  { path: '', redirectTo: 'hotels', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisternewComponent },
  { path: 'members', component: MembersComponent, canActivate: [AuthGuard] },
  { path: 'promise', component: PromiseComponent },
  { path: 'add', component: AddNewHotelComponent, canActivate: [AuthGuard] },
  { path: 'hotels', component: HotelsComponent },
  { path: 'hotels/:id', component: HotelDetailComponent },
  { path: 'generator', component: HotelGeneratorComponent, canActivate: [AuthGuard] },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
