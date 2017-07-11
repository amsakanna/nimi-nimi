import { Routes, RouterModule } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { AdminPageComponent } from "./admin-page/admin-page.component";
import { JournalPageComponent } from "./journal-page/journal-page.component";
import { InventoryPageComponent } from "./inventory-page/inventory-page.component";
import { BrandPageComponent } from "./brand-page/brand-page.component";
import { BrandComponent } from "./brand/brand.component";
import { DepartmentPageComponent } from "./department-page/department-page.component";
import { DepartmentComponent } from "./department/department.component";
import { ProductPageComponent } from "./product-page/product-page.component";
import { ProductComponent } from "./product/product.component";
import { ProductsPageComponent } from "./products-page/products-page.component";
import { UserPageComponent } from "./user-page/user-page.component";
import { CartPageComponent } from "./cart-page/cart-page.component";
import { ProfileComponent } from "./profile/profile.component";
import { AddressesComponent } from "./addresses/addresses.component";
import { CardsComponent } from "./cards/cards.component";
import { WishListsComponent } from "./wish-lists/wish-lists.component";
import { OrdersComponent } from "./orders/orders.component";

const APP_ROUTES: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'home', redirectTo: '', component: HomePageComponent },
    { path: 'user',component: UserPageComponent, children: [
        { path: 'profile', component: ProfileComponent },
        { path: 'addresses', component: AddressesComponent },
        { path: 'cards', component: CardsComponent },
        { path: 'wish-lists', component: WishListsComponent },
        { path: 'orders', component: OrdersComponent }
    ]},
    { path: 'cart',component: CartPageComponent },
    { path: 'admin', component: AdminPageComponent , children: [
        { path: 'journal', component: JournalPageComponent },
        { path: 'inventory', component: InventoryPageComponent },
        { path: 'definition', children: [
            { path: 'brand', component: BrandPageComponent, children: [
                { path: ':key', component: BrandComponent }
            ]},
            { path: 'department', component: DepartmentPageComponent, children: [
                { path: ':key', component: DepartmentComponent }
            ]},
            { path: 'product', component: ProductPageComponent, children: [
                { path: ':key', component: ProductComponent }
            ]}
        ]},
    ]},
    { path: 'products', component: ProductsPageComponent }
];

export const AppRouter = RouterModule.forRoot(APP_ROUTES);
