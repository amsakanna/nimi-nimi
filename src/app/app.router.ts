import { Routes, RouterModule } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { AdminPageComponent } from "./admin-page/admin-page.component";
import { JournalPageComponent } from "./journal-page/journal-page.component";
import { JournalComponent, JournalFormComponent, JournalListComponent } from "./journal/journal.component";
import { InventoryComponent, InventoryFormComponent, InventoryListComponent } from "./inventory/inventory.component";
import { BrandComponent, BrandFormComponent, BrandListComponent } from "./brand/brand.component";
import { DepartmentComponent, DepartmentFormComponent, DepartmentListComponent } from "./department/department.component";
import { ProductComponent, ProductFormComponent, ProductListComponent } from "./product/product.component";
import { ColorComponent, ColorFormComponent, ColorListComponent } from "./color/color.component";
import { SizeComponent, SizeFormComponent, SizeListComponent } from "./size/size1.component";
import { DepartmentPageComponent } from "./department-page/department-page.component";
import { ProductsPageComponent } from "./products-page/products-page.component";
import { ProductPageComponent } from "./product-page/product-page.component";
import { UserPageComponent } from "./user-page/user-page.component";
import { CartPageComponent } from "./cart-page/cart-page.component";
import { ProfileComponent } from "./profile/profile.component";
import { AddressesComponent } from "./addresses/addresses.component";
import { AddressComponent } from "./address/address.component";
import { AddressFormComponent } from "./addresses/address-form.component";
import { CardsComponent } from "./cards/cards.component";
import { CardComponent } from "./card/card.component";
import { CardFormComponent } from "./cards/card-form.component";
import { WishListsComponent } from "./wish-lists/wish-lists.component";
import { WishListComponent } from "./wish-list/wish-list.component";
import { WishListFormComponent } from "./wish-lists/wish-list-form.component";
import { OrdersComponent } from "./orders/orders.component";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./services/auth.service";

const APP_ROUTES: Routes = [
    { path: '', component: HomePageComponent, children: [
        { path: 'products', component: ProductsPageComponent },
        { path: 'products/:key', children: [
            { path: '', component: ProductPageComponent }
            // { path: 'detail', component: ProductDetailPageComponent },
            // { path: 'reviews', component: ReviewsPageComponent },
        ]}
    ]},
    { path: 'auth', component: AuthComponent },
    { path: 'home', redirectTo: '', pathMatch: 'full' },
    { path: 'user', component: UserPageComponent, canActivate: [AuthGuard], children: [
        { path: '', component: ProfileComponent },
        { path: 'profile', redirectTo: '', pathMatch: 'full' },
        { path: 'addresses', component: AddressesComponent},
        { path: 'addresses/:key', children: [
            { path: '', component: AddressComponent },
            { path: 'edit', component: AddressFormComponent }
        ]},
        { path: 'cards', component: CardsComponent },
        { path: 'cards/:key', children: [
            { path: '', component: CardComponent },
            { path: 'edit', component: CardFormComponent }
        ]},
        { path: 'wish-lists', component: WishListsComponent },
        { path: 'wish-lists/:key', children: [
            { path: '', component: WishListComponent },
            { path: 'edit', component: WishListFormComponent }
        ]},
        { path: 'orders', component: OrdersComponent }
    ]},
    { path: 'cart',component: CartPageComponent },
    { path: 'admin', component: AdminPageComponent, children: [
        { path:'', redirectTo: 'transaction/journal', pathMatch: 'full' },
        { path: 'transaction/journal', component: JournalListComponent },
        { path: 'transaction/journal/:key', children: [
            { path: '', component: JournalComponent },
            { path: 'edit', component: JournalFormComponent }
        ]},
        { path: 'transaction/inventory', component: InventoryListComponent },
        { path: 'transaction/inventory/:key', children: [
            { path: '', component: InventoryComponent },
            { path: 'edit', component: InventoryFormComponent }
        ]},
        { path: 'dimension/brand', component: BrandListComponent },
        { path: 'dimension/brand/:key', children: [
            { path: '', component: BrandComponent },
            { path: 'edit', component: BrandFormComponent }
        ]},
        { path: 'dimension/department', component: DepartmentListComponent },
        { path: 'dimension/department/:key', children: [
            { path: '', component: DepartmentComponent },
            { path: 'edit', component: DepartmentFormComponent }
        ]},
        { path: 'dimension/product', component: ProductListComponent },
        { path: 'dimension/product/:key', children: [
            { path: '', component: ProductComponent },
            { path: 'edit', component: ProductFormComponent }
        ]},
        { path: 'dimension/color', component: ColorListComponent },
        { path: 'dimension/color/:key', children: [
            { path: '', component: ColorComponent },
            { path: 'edit', component: ColorFormComponent }
        ]},
        { path: 'dimension/size', component: SizeListComponent },
        { path: 'dimension/size/:key', children: [
            { path: '', component: SizeComponent },
            { path: 'edit', component: SizeFormComponent }
        ]}
        // { path: 'dimension/department', component: DepartmentPageComponent },
        // { path: 'dimension/department/:key', children: [
        //     { path: '', component: DepartmentComponent },
        //     { path: 'edit', component: DepartmentFormComponent }
        // ]},
        // { path: 'dimension/product', component: ProductPageComponent },
        // { path: 'dimension/product/:key', children: [
        //     { path: '', component: ProductComponent },
        //     { path: 'edit', component: ProductFormComponent }
        // ]},
        // { path: 'dimension/size', component: SizePageComponent },
        // { path: 'dimension/size/:key', children: [
        //     { path: '', component: SizeComponent },
        //     { path: 'edit', component: SizeFormComponent }
        // ]},
        // { path: 'dimension/colour', component: ColourPageComponent },
        // { path: 'dimension/colour/:key', children: [
        //     { path: '', component: ColourComponent },
        //     { path: 'edit', component: ColourFormComponent }
        // ]}
    ]},
    { path: 'products', component: ProductsPageComponent }
];

export const AppRouter = RouterModule.forRoot(APP_ROUTES);
