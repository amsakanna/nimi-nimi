import { Routes, RouterModule } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { AdminPageComponent } from "./admin-page/admin-page.component";
import { ProductsPageComponent } from "./products-page/products-page.component";

const APP_ROUTES: Routes = [
    { path: '', component: HomePageComponent},    
    { path: 'admin', component: AdminPageComponent },
    { path: 'products', component: ProductsPageComponent }
];

export const AppRouter = RouterModule.forRoot(APP_ROUTES);
