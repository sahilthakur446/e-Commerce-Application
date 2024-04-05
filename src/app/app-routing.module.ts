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
import { UpdateAddressComponent } from './user-profile/update-address/update-address.component';
import { UserCartComponent } from './user-profile/user-cart/user-cart.component';
import { PaymentComponent } from './payment/payment.component';
import { UserOrdersComponent } from './user-profile/user-orders/user-orders/user-orders.component';
import { OrdersManagementComponent } from './admin-components/orders-management/orders-management.component';

const routes: Routes = [
  { path: "", redirectTo:"/Home",pathMatch: 'full'},
  { path: "Home", component: HomepageComponent},
  { path: "login", component: LoginComponent,pathMatch:'full' },
  { path: "userdashboard",component:UserDashboardComponent},
  { path: "userdashboard/accountdetails", component: UserDetailsComponent },
  { path: "userdashboard/addresses", component:AddressManagementComponent},
  { path: "userdashboard/addresses/addaddress", component:AddAddressComponent},
  { path: "userdashboard/addresses/editaddress/:addressid", component:UpdateAddressComponent},
  { path: "userdashboard/wishlist", component:UserWishlistComponent},
  { path: "userdashboard/orders", component:UserOrdersComponent},
  { path: "wishlist", component:UserWishlistComponent},
  { path: "checkout/cart", component:UserCartComponent},
  { path: "checkout/cart/payment", component:PaymentComponent},
  { path: "register", component: RegisterComponent },
  { path: "UpdateProduct", component: UpdateProductComponent},
  { path: "products",component:ProductShowcaseComponent},
  { path: "products/:segment",component:ProductShowcaseComponent},
  { path: "products/category/:category",component:ProductShowcaseComponent},
  { path: "products/productdetail/:productid",component:ProductDetailComponent},
  { path: "ProductManager/UpdateProduct/:productid", component: UpdateProductComponent},
  { path: "ProductManager/AddProduct", component: AddProductComponent },
  { path: "ProductManager", component: ProductManagementComponent },
  { path: "CategoryManager", component: CategoryManagerComponent, canActivate:[authGuard]},
  { path: "BrandManager", component: BrandManagerComponent, canActivate:[authGuard] },
  { path: "orderslist", component: OrdersManagementComponent },
  { path: "**", component: HomepageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
