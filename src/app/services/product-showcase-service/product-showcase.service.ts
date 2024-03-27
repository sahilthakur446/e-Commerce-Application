import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductInfo } from 'src/app/models/product/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductShowcaseService {
  
private baseUrl:string = 'https://localhost:7248/api/'
  constructor(private http:HttpClient) { }
 
  getProduct(productId:string)
  {
    let apiUrl = `${this.baseUrl}Product/GetProduct/${productId}`
    return this.http.get<ProductInfo>(apiUrl);
  }

}
