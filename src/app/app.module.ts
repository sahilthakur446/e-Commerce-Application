import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NgHeroiconsModule } from '@dimaslz/ng-heroicons';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { HomepageComponent } from './homepage/homepage.component'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddProductComponent } from './admin-components/add-product/add-product.component';
import { UpdateProductComponent } from './admin-components/update-product/update-product.component';
import { ProductManagementComponent } from './admin-components/product-management/product-management.component';
import { CategoryManagerComponent } from './admin-components/category-manager/category-manager.component';
import { BrandManagerComponent } from './admin-components/brand-manager/brand-manager.component'
import { TokenInterceptor } from './interceptors/token.interceptor';
import { UserDashboardComponent } from './user-profile/user-dashboard/user-dashboard.component';
import { UserDetailsComponent } from './user-profile/user-details/user-details.component';
import { UserWishlistComponent } from './user-profile/user-wishlist/user-wishlist.component';
import { AddressManagementComponent } from './user-profile/address-management/address-management.component';
import { ProductShowcaseComponent } from './product-showcase/product-showcase.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AddAddressComponent } from './user-profile/add-address/add-address.component';
import { UpdateAddressComponent } from './user-profile/update-address/update-address.component';
import { UserCartComponent } from './user-profile/user-cart/user-cart.component';
import { ResponseModalComponent } from './response-modal/response-modal.component';
import { UserOrdersComponent } from './user-profile/user-orders/user-orders/user-orders.component';
import { OrdersManagementComponent } from './admin-components/orders-management/orders-management.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    AddProductComponent,
    UpdateProductComponent,
    ProductManagementComponent,
    CategoryManagerComponent,
    BrandManagerComponent,
    UserDashboardComponent,
    UserDetailsComponent,
    UserWishlistComponent,
    AddressManagementComponent,
    ProductShowcaseComponent,
    ProductDetailComponent,
    AddAddressComponent,
    UpdateAddressComponent,
    UserCartComponent,
    ResponseModalComponent,
    UserOrdersComponent,
    OrdersManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgHeroiconsModule,
    FormsModule, 
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
