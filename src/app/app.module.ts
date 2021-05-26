import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MembersComponent } from './components/members/members.component';
import { AngularFireModule, FIREBASE_APP_NAME } from '@angular/fire';
import { AgmCoreModule } from '@agm/core';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LayoutModule } from '@angular/cdk/layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AdminComponent } from './components/admin/admin.component';
import { AddNewHotelComponent } from './components/admin/add-new-hotel/add-new-hotel.component';
import { HotelGeneratorComponent } from './components/admin/hotel-generator/hotel-generator.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { HotelItemComponent } from './components/hotels/hotel-item/hotel-item.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchHotelsComponent } from './components/search-hotels/search-hotels.component';
import { HotelDetailComponent } from './components/hotels/hotel-detail/hotel-detail.component';
import { Error404Component } from './components/error404/error404.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyReservationsComponent } from './components/my-reservations/my-reservations.component';
import { LazyImgDirective } from './shared/directives/lazy-img.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ToastrModule } from 'ngx-toastr';
import { MyReservationItemComponent } from './components/my-reservations/my-reservation-item/my-reservation-item.component';
import { AllImagesComponent } from './components/all-images/all-images.component';
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import { environment } from 'src/environments/environment';

const firebaseConfig = {
  apiKey: environment.FIREBASE_API_KEY,
  authDomain: "reserveapp-1e819.firebaseapp.com",
  databaseURL: "https://reserveapp-1e819.firebaseio.com",
  projectId: "reserveapp-1e819",
  storageBucket: "reserveapp-1e819.appspot.com",
  messagingSenderId: "975222630848",
  appId: "1:975222630848:web:7da25526260536bdaec025",
  measurementId: "G-HC19CB5LSS"
}

firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    MembersComponent,
    AdminComponent,
    AddNewHotelComponent,
    HotelGeneratorComponent,
    HotelsComponent,
    HotelItemComponent,
    RegisterComponent,
    SearchHotelsComponent,
    HotelDetailComponent,
    Error404Component,
    ProfileComponent,
    LazyImgDirective,
    MyReservationsComponent,
    MyReservationItemComponent,
    AllImagesComponent,
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAMgMV7ER34afwoVPmwcrA6deI0EUYISVI'
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    MatSnackBarModule,
    LayoutModule,
    DragDropModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    AngularFireAuthModule,
    NgxSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
