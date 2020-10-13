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

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisternewComponent },
  { path: 'members', component: MembersComponent, canActivate: [AuthGuard] },
  { path: 'promise', component: PromiseComponent },
  { path: 'add', component: AddNewHotelComponent },
  { path: 'hotels', component: HotelsComponent },
  { path: 'generator', component: HotelGeneratorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
