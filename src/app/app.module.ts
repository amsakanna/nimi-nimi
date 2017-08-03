import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { ColorPickerModule  } from 'angular2-color-picker';
import { Router } from '@angular/router';

import 'hammerjs';
import { AppRouter } from './app.router';
import { AppComponent } from './app.component';
import { RouterService } from './services/router.service';
import { LogService } from './services/log.service';
import { AuthGuard } from './services/auth.service';

import { ProductService } from './services/product.service';
import { BrandService } from './services/brand.service';
import { DepartmentService } from './services/department.service';
import { AccountService } from './services/account.service';
import { JournalService } from './services/journal.service';
import { InventoryService } from './services/inventory.service';
import { KeyValService } from './services/key-val.service';
import { UserService } from './services/user.service';
import { AddressService } from './services/address.service';
import { CardService } from './services/card.service';

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
import { JamListContainerComponent } from './jam-list-container/jam-list-container.component';
import { JamListComponent } from './jam-list/jam-list.component';
import { UserPageComponent } from './user-page/user-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { AuthComponent } from './auth/auth.component';
import { ProfileComponent } from './profile/profile.component';
import { AddressesComponent } from './addresses/addresses.component';
import { CardsComponent } from './cards/cards.component';
import { WishListsComponent } from './wish-lists/wish-lists.component';
import { OrdersComponent } from './orders/orders.component';
import { JamFormComponent } from './jam-form/jam-form.component';
import { JamListItemComponent } from './jam-list-item/jam-list-item.component';
import { AddressComponent } from './address/address.component';
import { AddressFormComponent } from './addresses/address-form.component';
import { CardFormComponent } from './cards/card-form.component';

export const firebaseAppConfig : FirebaseAppConfig = {
    apiKey: "AIzaSyBV4KfPwTrqbFXzf7Sm6YAXkjSY1jSVcEk",
    authDomain: "nimi-nimi.firebaseapp.com",
    databaseURL: "https://nimi-nimi.firebaseio.com",
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
    DepartmentComponent,
    JamListContainerComponent,
    JamListComponent,
    UserPageComponent,
    CartPageComponent,
    AuthComponent,
    ProfileComponent,
    AddressesComponent,
    CardsComponent,
    WishListsComponent,
    OrdersComponent,
    JamFormComponent,
    JamListItemComponent,
    AddressComponent,
    AddressFormComponent,
    CardFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    AngularFireModule.initializeApp(firebaseAppConfig),
    AppRouter,
    ColorPickerModule
  ],
  providers: [
    RouterService,
    LogService,
    AuthGuard,
    KeyValService,
	  ProductService,
    BrandService,
    DepartmentService,
    AccountService,
    JournalService,
    InventoryService,
    UserService,
    AddressService,
    CardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
