import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from '@angular/forms';
import { map } from 'rxjs';
import { AddProduct, ProductInfo } from 'src/app/models/product/product.model';


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
  getCategoryList(){ 
    let apiUrl = `${this.BaseUrl}Category/GetCategoryList`
    return this.http.get(apiUrl)
  }
  getBrandsList(){
    let apiUrl = `${this.BaseUrl}Brand/GetBrandList`
    return this.http.get(apiUrl)
  }

  addProduct(product:FormData){
    let apiUrl =  `${this.BaseUrl}Product/AddProduct`
    return this.http.post(apiUrl,product)
  }
}
