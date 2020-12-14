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
import { AngularFireModule } from '@angular/fire';
import { DbfirestoreComponent } from './components/dbfirestore/dbfirestore.component';
import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LayoutModule } from '@angular/cdk/layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PromiseComponent } from './components/promise/promise.component'
import { AddNewHotelComponent } from './components/add-new-hotel/add-new-hotel.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { HotelItemComponent } from './components/hotels/hotel-item/hotel-item.component';
import { HotelGeneratorComponent } from './components/hotel-generator/hotel-generator.component';
import { RegisterComponent } from './components/register/register.component';
import { FindHotelsComponent } from './components/find-hotels/find-hotels.component';
import { HotelDetailComponent } from './components/hotels/hotel-detail/hotel-detail.component';
import { Error404Component } from './components/error404/error404.component';
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component';
import { ProfileComponent } from './components/profile/profile.component';
import * as firebase from "firebase/app";
import { LazyImgDirective } from './shared/directives/lazy-img.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AngularFireAuthModule } from '@angular/fire/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAZedN_hMussPs1W25mNzoSgU8B8lQ5hsk",
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
    DbfirestoreComponent,
    PromiseComponent,
    AddNewHotelComponent,
    HotelsComponent,
    HotelItemComponent,
    HotelGeneratorComponent,
    RegisterComponent,
    FindHotelsComponent,
    HotelDetailComponent,
    Error404Component,
    RightSidebarComponent,
    ProfileComponent,
    LazyImgDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC_fTrGTvK8jjXIj2epeiY2HKqVWD_MFeM'
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    LayoutModule,
    DragDropModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
