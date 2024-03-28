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
addedToWishList:boolean = false;
wishlistText:string = 'Wishlist'
addedToCart:boolean = false;
originalMRP:number = 0
discount:number = 0
constructor(route:ActivatedRoute ,private productShowcaseService:ProductShowcaseService) {
  this.productId = route.snapshot.paramMap.get('productid')
}
  ngOnInit(): void {
    this.productShowcaseService.getProduct(this.productId!).subscribe({
      next:(response:ProductInfo)=> {this.productDetails = response
        this.originalMRP = Math.floor(this.productDetails.price * (Math.random() + 1))
        this.discount = Math.ceil((this.productDetails.price/this.originalMRP)*100)
        
      }
    })
    
  }

  wishlishButton(){
    this.addedToWishList = !this.addedToWishList
    this.wishlistText = this.wishlistText == 'Wishlist'?'Wishlisted':'Wishlist'
  }

  toogleCartButton(){
    console.log(this.addedToCart);
    
    this.addedToCart = !this.addedToCart
  }
}
