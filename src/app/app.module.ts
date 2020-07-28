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
import { FormsModule } from '@angular/forms';
import { FirstcolComponent } from './components/firstcol/firstcol.component';
import { SecondcolComponent } from './components/secondcol/secondcol.component';
import { MembersComponent } from './components/members/members.component';
import { AngularFireModule } from '@angular/fire';
import { DbfirestoreComponent } from './components/dbfirestore/dbfirestore.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
