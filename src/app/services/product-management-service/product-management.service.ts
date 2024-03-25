import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductManagementService {
  private BaseUrl:string = 'https://localhost:7248/api/'
 private GetAllProductsApiUrl = 'https://localhost:7248/api/Product/GetAllProducts';
 categoryListUrl ="https://localhost:7248/api/Category/GetCategoryList";
 brandListUrl ="https://localhost:7248/api/Brand/GetBrandList";
  constructor(private http: HttpClient) { }

  getAllProducts(){
    let apiUrl = `${this.BaseUrl}Product/GetAllProducts`
    return this.http.get<Product[]>(apiUrl).pipe(
      map(response => response as Product[])
    );
  }
  getCategoryList(){
    let apiUrl = `${this.BaseUrl}Category/GetCategoryList`
    return this.http.get(apiUrl)
  }
  getBrandsList(){
    let apiUrl = `${this.BaseUrl}Brand/GetBrandList`
    return this.http.get(apiUrl)
  }
}
