import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import 'hammerjs';

import { AppComponent } from './app.component';

export const firebaseConfig = {
    apiKey: "AIzaSyA3dca3bAlT4gR6pytsEZDOJVKFRU3ptE4",
    authDomain: "shopping-81d9a.firebaseapp.com",
    databaseURL: "https://shopping-81d9a.firebaseio.com",
    storageBucket: "shopping-81d9a.appspot.com",
    messagingSenderId: "1011127812612"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
