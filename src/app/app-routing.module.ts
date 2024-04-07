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
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { UserDashboardComponent } from './user-profile/user-dashboard/user-dashboard.component';
import { UserDetailsComponent } from './user-profile/user-details/user-details.component';
import { UserWishlistComponent } from './user-profile/user-wishlist/user-wishlist.component';
import { AddressManagementComponent } from './user-profile/address-management/address-management.component';
import { ProductShowcaseComponent } from './product-showcase/product-showcase.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AddAddressComponent } from './user-profile/add-address/add-address.component';
import { UpdateAddressComponent } from './user-profile/update-address/update-address.component';
import { UserCartComponent } from './user-profile/user-cart/user-cart.component';
import { UserOrdersComponent } from './user-profile/user-orders/user-orders/user-orders.component';
import { OrdersManagementComponent } from './admin-components/orders-management/orders-management.component';
import { tokenAuthGuard } from './guards/token-auth.guard';

const routes: Routes = [
  { path: "", redirectTo:"/Home",pathMatch: 'full'},
  { path: "Home", component: HomepageComponent},
  { path: "login", component: LoginComponent,pathMatch:'full' },
  { path: "userdashboard",component:UserDashboardComponent, canActivate:[tokenAuthGuard]},
  { path: "userdashboard/accountdetails", component: UserDetailsComponent, canActivate:[tokenAuthGuard]},
  { path: "userdashboard/addresses", component:AddressManagementComponent, canActivate:[tokenAuthGuard]},
  { path: "userdashboard/addresses/addaddress", component:AddAddressComponent, canActivate:[tokenAuthGuard]},
  { path: "userdashboard/addresses/editaddress/:addressid", component:UpdateAddressComponent, canActivate:[tokenAuthGuard]},
  { path: "userdashboard/wishlist", component:UserWishlistComponent, canActivate:[tokenAuthGuard]},
  { path: "userdashboard/orders", component:UserOrdersComponent, canActivate:[tokenAuthGuard]},
  { path: "checkout/cart", component:UserCartComponent},
  { path: "register", component: RegisterComponent },
  { path: "UpdateProduct", component: UpdateProductComponent},
  { path: "products",component:ProductShowcaseComponent},
  { path: "products/:segment",component:ProductShowcaseComponent},
  { path: "products/category/:category",component:ProductShowcaseComponent},
  { path: "products/productdetail/:productid",component:ProductDetailComponent},
  { path: "ProductManager/UpdateProduct/:productid", component: UpdateProductComponent, canActivate:[AdminAuthGuard]},
  { path: "ProductManager/AddProduct", component: AddProductComponent, canActivate:[AdminAuthGuard] },
  { path: "ProductManager", component: ProductManagementComponent, canActivate:[AdminAuthGuard] },
  { path: "CategoryManager", component: CategoryManagerComponent, canActivate:[AdminAuthGuard]},
  { path: "BrandManager", component: BrandManagerComponent, canActivate:[AdminAuthGuard] },
  { path: "orderslist", component: OrdersManagementComponent, canActivate:[AdminAuthGuard] },
  { path: "**", component: HomepageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
