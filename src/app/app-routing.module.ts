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
import { authGuard } from './guards/auth.guard';
import { UserDashboardComponent } from './user-profile/user-dashboard/user-dashboard.component';
import { UserDetailsComponent } from './user-profile/user-details/user-details.component';
import { UserWishlistComponent } from './user-profile/user-wishlist/user-wishlist.component';
import { AddressManagementComponent } from './user-profile/address-management/address-management.component';
import { ProductShowcaseComponent } from './product-showcase/product-showcase.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AddAddressComponent } from './user-profile/add-address/add-address.component';

const routes: Routes = [
  { path: "", redirectTo:"/Home",pathMatch: 'full'},
  { path: "Home", component: HomepageComponent},
  { path: "Login", component: LoginComponent,pathMatch:'full' },
  { path: "userdashboard",component:UserDashboardComponent},
  { path: "userdashboard/accountdetails", component: UserDetailsComponent },
  { path: "userdashboard/addresses", component:AddressManagementComponent},
  { path: "userdashboard/addresses/addaddress", component:AddAddressComponent},
  // { path: "userdashboard/addresses/editaddress", component:AddAddressComponent},
  { path: "wishlist", component:UserWishlistComponent},
  { path: "Login/Register", component: RegisterComponent },
  { path: "UpdateProduct", component: UpdateProductComponent},
  { path: "products",component:ProductShowcaseComponent},
  { path: "products/productdetail/:productid",component:ProductDetailComponent},
  { path: "ProductManager/UpdateProduct/:productid", component: UpdateProductComponent},
  { path: "ProductManager/AddProduct", component: AddProductComponent },
  { path: "ProductManager", component: ProductManagementComponent },
  { path: "CategoryManager", component: CategoryManagerComponent, canActivate:[authGuard]},
  { path: "BrandManager", component: BrandManagerComponent, canActivate:[authGuard] },
  { path: "**", component: HomepageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
