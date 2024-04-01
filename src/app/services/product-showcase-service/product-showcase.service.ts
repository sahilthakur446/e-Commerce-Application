import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductInfo } from 'src/app/models/product/product.model';
import { ProductManagementService } from '../product-management-service/product-management.service';

@Injectable({
  providedIn: 'root'
})
export class ProductShowcaseService{

private baseUrl:string = 'https://localhost:7248/api/'
minPrice:number|undefined;
maxPrice:number|undefined;
categoryName:string|undefined;
categoryId:number|undefined;
brandId:number|undefined;
targetGender:string|undefined;
newArrival:boolean|undefined;
  constructor(private http:HttpClient, private productManagementService:ProductManagementService) { }
 
  getProduct(productId:string)
  {
    let apiUrl = `${this.baseUrl}Product/GetProduct/${productId}`
    return this.http.get<ProductInfo>(apiUrl);
  }

  GetProductwithGivenFilter(){
    let params = new HttpParams();
    if(this.minPrice) params = params.set("minPrice", this.minPrice);
    if(this.maxPrice) params = params.set("maxPrice", this.maxPrice);
    if(this.categoryName) params = params.set("category", this.categoryName);
    if(this.categoryId) params = params.set("categoryId", this.categoryId);
    if(this.brandId) params = params.set("brandId", this.brandId);
    if(this.targetGender) params = params.set("gender", this.targetGender);
    if(this.newArrival) params = params.set("isNew",this.newArrival)
    let apiUrl = `${this.baseUrl}Product/GetProductwithGivenFilter?${params.toString()}`
    return this.http.get<ProductInfo[]>(apiUrl)
}
}
