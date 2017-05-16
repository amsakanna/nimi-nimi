import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { ColorPickerModule  } from 'angular2-color-picker';
import { Router } from '@angular/router';

import 'hammerjs';
import { AppRouter } from './app.router';
import { AppComponent } from './app.component';
import { LogService } from './services/log.service';
import { ProductService } from './services/product.service';
import { BrandService } from './services/brand.service';
import { DepartmentService } from './services/department.service';
import { AccountService } from './services/account.service';
import { HomePageComponent } from './home-page/home-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { JournalPageComponent } from './journal-page/journal-page.component';
import { InventoryPageComponent } from './inventory-page/inventory-page.component';
import { BrandPageComponent } from './brand-page/brand-page.component';
import { BrandComponent } from './brand/brand.component';
import { DepartmentPageComponent } from './department-page/department-page.component';
import { DepartmentComponent } from './department/department.component';
import { ProductComponent } from './product/product.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductsPageComponent } from './products-page/products-page.component';

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
    ProductComponent,
    InventoryPageComponent,
    JournalPageComponent,
    BrandPageComponent,
    DepartmentPageComponent,
    ProductPageComponent,
    BrandComponent,
    DepartmentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AppRouter,
    ColorPickerModule
  ],
  providers: [	  
    LogService,
	  ProductService,
    BrandService,
    DepartmentService,
    AccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
