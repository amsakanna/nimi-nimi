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

const APP_ROUTES: Routes = [
    { path: '', component: HomePageComponent},    
    { path: 'admin', component: AdminPageComponent , children: [
        { path: 'journal', component: JournalPageComponent },
        { path: 'inventory', component: InventoryPageComponent, children: [
            { path: 'brand', component: BrandPageComponent, children: [
                { path: ':id', component: BrandComponent }
            ] },
            { path: 'department', component: DepartmentPageComponent, children: [
                { path: ':id', component: DepartmentComponent }
            ] },
            { path: 'product', component: ProductPageComponent, children: [
                { path: ':id', component: ProductComponent }
            ] },
        ]}
    ]},
    { path: 'products', component: ProductsPageComponent }
];

export const AppRouter = RouterModule.forRoot(APP_ROUTES);
