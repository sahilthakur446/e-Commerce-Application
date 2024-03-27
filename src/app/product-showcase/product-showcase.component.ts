import { Component, OnInit } from '@angular/core';
import { ProductManagementService } from '../services/product-management-service/product-management.service';
import { ProductInfo } from '../models/product/product.model';
import { categoryList } from '../models/category/category.model';
import { BrandList } from '../models/brand/brand.model';

@Component({
  selector: 'app-product-showcase',
  templateUrl: './product-showcase.component.html',
  styleUrls: ['./product-showcase.component.css']
})
export class ProductShowcaseComponent implements OnInit{
productList:ProductInfo[] = [];
categoryList:categoryList[] = [];
brandList:BrandList[] = []
constructor(private productMngmntservice:ProductManagementService) {
}
  ngOnInit(): void {
    this.getAllProducts()
    this.getCategoryList()
    this.getBrandList()
  }
getAllProducts(){
  this.productMngmntservice.getAllProducts().subscribe({
    next:(response:ProductInfo[]) => this.productList = response,
    error:(error) => console.log(error)
  })
}

getCategoryList(){
  this.productMngmntservice.getCategoryList().subscribe({
    next:(response:categoryList[])=> this.categoryList = response,
    error:(error) => (console.log(error)
    )
  })
}
  getBrandList(){
    this.productMngmntservice.getBrandsList().subscribe({
      next:(response:BrandList[]) => this.brandList = response,
      error:(error) => (console.log(error)
      )
    })
}
}
