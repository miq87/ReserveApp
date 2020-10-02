import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirstcolComponent } from './components/firstcol/firstcol.component';
import { SecondcolComponent } from './components/secondcol/secondcol.component';
import { MembersComponent } from './components/members/members.component';
import { AngularFireModule } from '@angular/fire';
import { DbfirestoreComponent } from './components/dbfirestore/dbfirestore.component';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { AgmCoreModule } from '@agm/core';
import { BookingComponent } from './components/booking/booking.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatButtonModule } from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatChipsModule } from '@angular/material/chips';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { TablesComponent } from './components/tables/tables.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { DragdropComponent } from './components/dragdrop/dragdrop.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PromiseComponent } from './components/promise/promise.component'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


const firebaseConfig = {
  apiKey: "AIzaSyAZedN_hMussPs1W25mNzoSgU8B8lQ5hsk",
  authDomain: "reserveapp-1e819.firebaseapp.com",
  databaseURL: "https://reserveapp-1e819.firebaseio.com",
  projectId: "reserveapp-1e819",
  storageBucket: "reserveapp-1e819.appspot.com",
  messagingSenderId: "975222630848",
  appId: "1:975222630848:web:7da25526260536bdaec025",
  measurementId: "G-HC19CB5LSS"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent,
    FooterComponent,
    HeaderComponent,
    HeroComponent,
    FirstcolComponent,
    SecondcolComponent,
    MembersComponent,
    DbfirestoreComponent,
    BookingComponent,
    AddressFormComponent,
    TablesComponent,
    DashboardComponent,
    DragdropComponent,
    PromiseComponent,
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
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatChipsModule,
    MatRadioModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    LayoutModule,
    DragDropModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
