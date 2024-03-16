import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AddProductComponent } from './admin-components/add-product/add-product.component';
import { ProductManagementComponent } from './admin-components/product-management/product-management.component';
import { UpdateProductComponent } from './admin-components/update-product/update-product.component';
import { CategoryManagerComponent } from './admin-components/category-manager/category-manager.component';
import { BrandManagerComponent } from './admin-components/brand-manager/brand-manager.component';

const routes: Routes = [
  { path: "", redirectTo:"/Home",pathMatch: 'full'},
  { path: "Home", component: HomepageComponent},
  { path: "Login", component: LoginComponent,pathMatch:'full' },
  { path: "Login/Register", component: RegisterComponent },
  { path: "UpdateProduct", component: UpdateProductComponent},
  { path: "ProductManager/UpdateProduct/:productid", component: UpdateProductComponent},
  { path: "ProductManager/AddProduct", component: AddProductComponent },
  { path: "ProductManager", component: ProductManagementComponent },
  { path: "CategoryManager", component: CategoryManagerComponent },
  { path: "BrandManager", component: BrandManagerComponent },
  { path: "Home", component: HomepageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
