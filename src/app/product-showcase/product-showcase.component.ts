import { Component, OnInit } from '@angular/core';
import { ProductManagementService } from '../services/product-management-service/product-management.service';
import { ProductInfo } from '../models/product/product.model';

@Component({
  selector: 'app-product-showcase',
  templateUrl: './product-showcase.component.html',
  styleUrls: ['./product-showcase.component.css']
})
export class ProductShowcaseComponent implements OnInit{
productList:ProductInfo[] = [];
constructor(private productMngmntservice:ProductManagementService) {
}
  ngOnInit(): void {
    this.getAllProducts()
  }
getAllProducts(){
  this.productMngmntservice.getAllProducts().subscribe({
    next:(response:ProductInfo[]) => { console.log(response)
    this.productList = response;}
  })
}
}
