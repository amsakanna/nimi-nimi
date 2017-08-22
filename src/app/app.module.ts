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

import {
	AddressService,
	ProductService,
	BrandService,
	DepartmentService,
	AccountService,
	JournalService,
	InventoryService,
	UserService,
  CardService,
  WishListService,
  TagService,
  PictureService,
  IndexService,
  ColorService,
  SizeService,
  CartItemService
} from './services/all-data.service';
import { KeyValService } from './services/key-val.service';
import { DefaultService } from './services/default.service';

import { HomePageComponent } from './home-page/home-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { JournalPageComponent } from './journal-page/journal-page.component';
import { InventoryPageComponent } from './inventory-page/inventory-page.component';
import { BrandPageComponent } from './brand-page/brand-page.component';
import { DepartmentPageComponent } from './department-page/department-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { JamListContainerComponent } from './jam-list-container/jam-list-container.component';
import { JamListComponent } from './jam-list/jam-list.component';
import { JamListItemComponent } from './jam-list-item/jam-list-item.component';
import { JamFormComponent } from './jam-form/jam-form.component';
import { UserPageComponent } from './user-page/user-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { AuthComponent } from './auth/auth.component';
import { ProfileComponent } from './profile/profile.component';
import { AddressesComponent } from './addresses/addresses.component';
import { CardsComponent } from './cards/cards.component';
import { WishListsComponent } from './wish-lists/wish-lists.component';
import { OrdersComponent } from './orders/orders.component';
import { AddressComponent } from './address/address.component';
import { AddressFormComponent } from './addresses/address-form.component';
import { CardFormComponent } from './cards/card-form.component';
import { CardComponent } from './card/card.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { WishListFormComponent } from './wish-lists/wish-list-form.component';
import { JournalComponent, JournalFormComponent, JournalListComponent } from './journal/journal.component';
import { InventoryComponent, InventoryFormComponent, InventoryListComponent } from './inventory/inventory.component';
import { BrandComponent, BrandFormComponent, BrandListComponent } from './brand/brand.component';
import { DepartmentComponent, DepartmentFormComponent, DepartmentListComponent } from './department/department.component';
import { ProductComponent, ProductFormComponent, ProductListComponent } from './product/product.component';
import { ProductSearchBarComponent } from './product-search-bar/product-search-bar.component';
import { ColorComponent, ColorFormComponent, ColorListComponent } from './color/color.component';
import { SizeComponent, SizeFormComponent, SizeListComponent } from './size/size1.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';

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
    InventoryPageComponent,
    JournalPageComponent,
    BrandPageComponent,
    DepartmentPageComponent,
    ProductPageComponent,
    JamListContainerComponent,
    JamListComponent,
    JamListItemComponent,
    JamFormComponent,
    UserPageComponent,
    CartPageComponent,
    ProfileComponent,
    AddressesComponent,
    CardsComponent,
    WishListsComponent,
    OrdersComponent,
    AddressComponent,
    AddressFormComponent,
    CardFormComponent,
    CardComponent,
    WishListComponent,
    WishListFormComponent,
    JournalComponent, JournalFormComponent, JournalListComponent,
    InventoryComponent, InventoryFormComponent, InventoryListComponent,
    BrandComponent, BrandFormComponent, BrandListComponent,
    DepartmentComponent, DepartmentFormComponent, DepartmentListComponent,
    ProductComponent, ProductFormComponent, ProductListComponent,
    AuthComponent,
    ProductSearchBarComponent,
    ColorComponent, ColorFormComponent, ColorListComponent, 
    SizeComponent, SizeFormComponent, SizeListComponent, CheckoutPageComponent
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
    CardService,
    WishListService,
    TagService,
    PictureService,
    IndexService,
    ColorService,
    SizeService,
    CartItemService,
    DefaultService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
