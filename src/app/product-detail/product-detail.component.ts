import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductManagementService } from '../services/product-management-service/product-management.service';
import { ProductShowcaseService } from '../services/product-showcase-service/product-showcase.service';
import { ProductInfo } from '../models/product/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
productId:string|null =''
productDetails!:ProductInfo;
constructor(route:ActivatedRoute ,private productShowcaseService:ProductShowcaseService) {
  this.productId = route.snapshot.paramMap.get('productid')
}
  ngOnInit(): void {
    this.productShowcaseService.getProduct(this.productId!).subscribe({
      next:(response:ProductInfo)=> this.productDetails = response
    })
  }

}
