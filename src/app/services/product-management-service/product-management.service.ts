import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Product } from 'src/app/models/product/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductManagementService {
  private BaseUrl:string = 'https://localhost:7248/api/'
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

  addProduct(){
    let apiUrl =  `${this.BaseUrl}Product/AddProduct`
  }
}
