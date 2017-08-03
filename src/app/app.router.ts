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
import { AddressComponent } from "./address/address.component";
import { AddressFormComponent } from "./addresses/address-form.component";
import { CardsComponent } from "./cards/cards.component";
import { CardFormComponent } from "./cards/card-form.component";
import { WishListsComponent } from "./wish-lists/wish-lists.component";
import { OrdersComponent } from "./orders/orders.component";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./services/auth.service";

const APP_ROUTES: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'home', redirectTo: '', component: HomePageComponent },
    { path: 'user', component: UserPageComponent, canActivate: [AuthGuard], children: [
        { path: '', component: ProfileComponent },
        { path: 'profile', redirectTo: 'profile', pathMatch: 'full' },
        { path: 'addresses', component: AddressesComponent},
        { path: 'addresses/:key', children: [
            { path: '', component: AddressComponent },
            { path: 'edit', component: AddressFormComponent }
        ]},
        { path: 'cards', component: CardsComponent },
        { path: 'cards/:key', children: [
            // { path: '', component: CardComponent },
            { path: 'edit', component: CardFormComponent }
        ]},
        { path: 'wish-lists', component: WishListsComponent },
        { path: 'orders', component: OrdersComponent }
    ]},
    { path: 'cart',component: CartPageComponent },
    { path: 'admin', component: AdminPageComponent , children: [
        { path:'', redirectTo: 'inventory', pathMatch: 'full' },
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
