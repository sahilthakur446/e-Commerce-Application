import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AddProductComponent } from './admin-components/add-product/add-product.component';
import { ProductManagementComponent } from './admin-components/product-management/product-management.component';

const routes: Routes = [
  {path:"Login",component:LoginComponent},
  {path:"Login/Register",component:RegisterComponent},
  {path:"AddProduct",component:AddProductComponent},
  {path:"ProductManager",component:ProductManagementComponent},
  {path:"Home",component:HomepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
