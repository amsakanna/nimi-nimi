import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import 'hammerjs';

import { AppRouter } from './app.router';
import { AppComponent } from './app.component';
import { LogService } from './services/log.service';
import { ProductService } from './services/product.service';
import { HomePageComponent } from './home-page/home-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ProductComponent } from './product/product.component';

export const firebaseConfig = {
    apiKey: "AIzaSyBV4KfPwTrqbFXzf7Sm6YAXkjSY1jSVcEk",
    authDomain: "nimi-nimi.firebaseapp.com",
    databaseURL: "https://nimi-nimi.firebaseio.com",
    projectId: "nimi-nimi",
    storageBucket: "nimi-nimi.appspot.com",
    messagingSenderId: "1015138145277"
};

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AdminPageComponent,
    ProductsPageComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AppRouter
  ],
  providers: [	  
    LogService,
	  ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
