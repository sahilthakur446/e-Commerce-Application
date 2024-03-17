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
import { HttpClientModule } from '@angular/common/http';
import { AddProductComponent } from './admin-components/add-product/add-product.component';
import { UpdateProductComponent } from './admin-components/update-product/update-product.component';
import { ProductManagementComponent } from './admin-components/product-management/product-management.component';
import { CategoryManagerComponent } from './admin-components/category-manager/category-manager.component';
import { BrandManagerComponent } from './admin-components/brand-manager/brand-manager.component'
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
    BrandManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgHeroiconsModule,
    FormsModule, 
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
