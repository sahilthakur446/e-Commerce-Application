import { Component, OnInit } from '@angular/core';
import { ProductManagementService } from '../services/product-management-service/product-management.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-showcase',
  templateUrl: './product-showcase.component.html',
  styleUrls: ['./product-showcase.component.css']
})
export class ProductShowcaseComponent implements OnInit{
productList:Product[] = [];
constructor(private productMngmntservice:ProductManagementService) {
}
  ngOnInit(): void {
    this.getAllProducts()
  }
getAllProducts(){
  this.productMngmntservice.getAllProducts().subscribe({
    next:(response:Product[]) => { console.log(response)
    this.productList = response;}
  })
}
}
