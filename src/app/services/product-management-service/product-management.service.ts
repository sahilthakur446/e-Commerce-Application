import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from '@angular/forms';
import { map } from 'rxjs';
import { BrandList } from 'src/app/models/brand/brand.model';
import { categoryList } from 'src/app/models/category/category.model';
import { AddProduct, ProductInfo, ProductsForPagination } from 'src/app/models/product/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductManagementService {
  private BaseUrl:string = 'https://localhost:7248/api/'
  constructor(private http: HttpClient) { }

  getAllProducts(){
    let apiUrl = `${this.BaseUrl}Product/GetAllProducts`
    return this.http.get<ProductInfo[]>(apiUrl).pipe(
      map(response => response as ProductInfo[])
    );
  }

  getAllProductsWithPagination(currentPage:number){
    let apiUrl = `${this.BaseUrl}Product/GetProductsWithPagination?currentPage=${currentPage}&pageSize=20`
    return this.http.get<ProductsForPagination>(apiUrl)
  }

  GetProductsAbovePriceAsync(minPrice:number){
    let apiUrl = `${this.BaseUrl}Product/GetProductsAbovePrice/${minPrice}`
    return this.http.get<ProductInfo[]>(apiUrl)
  }

  GetProductsBelowPriceAsync(maxPrice:number){
    let apiUrl = `${this.BaseUrl}Product/GetProductsBelowPrice/${maxPrice}`
    return this.http.get<ProductInfo[]>(apiUrl)
  }

  GetProductsWithinPriceRange(minPrice:number,maxPrice:number){
    let apiUrl = `${this.BaseUrl}Product/GetProductsWithinPriceRange/${minPrice}/${maxPrice}`
    return this.http.get<ProductInfo[]>(apiUrl)
  }

  getCategoryList(){ 
    let apiUrl = `${this.BaseUrl}Category/GetCategoryList`
    return this.http.get<categoryList[]>(apiUrl)
  }

  getBrandsList(){
    let apiUrl = `${this.BaseUrl}Brand/GetBrandList`
    return this.http.get<BrandList[]>(apiUrl)
  }

  addProduct(product:FormData){
    let apiUrl = `${this.BaseUrl}Product/AddProduct`
    return this.http.post(apiUrl,product)
  }

  updateProduct(product:FormData,productId:string | null){
    let apiUrl = `${this.BaseUrl}Product/UpdateProduct/${productId}`;
    return this.http.put(apiUrl,product)
  }

  deleteProduct(productId:string){
    let apiUrl = `${this.BaseUrl}Product/DeleteProduct/${productId}`
    return this.http.delete(apiUrl)
  }
}
