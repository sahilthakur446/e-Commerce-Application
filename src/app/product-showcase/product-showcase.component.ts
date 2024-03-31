import { Component, OnInit } from '@angular/core';
import { ProductManagementService } from '../services/product-management-service/product-management.service';
import { ProductInfo } from '../models/product/product.model';
import { categoryList } from '../models/category/category.model';
import { BrandList } from '../models/brand/brand.model';
import { ProductShowcaseService } from '../services/product-showcase-service/product-showcase.service';
import { StorageService } from '../services/storage-service/storage.service';
import { AddWishlist } from '../models/wishlist/add-wishlist.model';
import { UserProfileManagementService } from '../services/user-profile-management-service/user-profile-management.service';

@Component({
  selector: 'app-product-showcase',
  templateUrl: './product-showcase.component.html',
  styleUrls: ['./product-showcase.component.css']
})
export class ProductShowcaseComponent implements OnInit {
  userId!:string
  productList: ProductInfo[] = [];
  categoryList: categoryList[] = [];
  brandList: BrandList[] = []
  minPrice: number | undefined
  maxPrice: number | undefined
  categoryId: number | undefined | string = ''
  brandId: number | undefined | string = ''
  gender: string | undefined = ''
  addedToWishList:boolean =false;
  constructor(private productMngmntservice: ProductManagementService, 
    private productShowcaseService: ProductShowcaseService,
    private storageService: StorageService,
    private userProfileService:UserProfileManagementService) {
  }
  ngOnInit(): void {
    this.getUserId()
    this.getAllProducts()
    this.getCategoryList()
    this.getBrandList()
  }

  getUserId(){
    this.userId = this.storageService.getItem('userId')!
  }

  getAllProducts() {
    this.productMngmntservice.getAllProducts().subscribe({
      next: (response: ProductInfo[]) => this.productList = response,
      error: (error) => console.log(error)
    })
  }

  getCategoryList() {
    this.productMngmntservice.getCategoryList().subscribe({
      next: (response: categoryList[]) => this.categoryList = response,
      error: (error) => (console.log(error)
      )
    })
  }
  getBrandList() {
    this.productMngmntservice.getBrandsList().subscribe({
      next: (response: BrandList[]) => this.brandList = response,
      error: (error) => (console.log(error)
      )
    })
  }

  GetProductwithGivenFilter() {
    this.productShowcaseService.minPrice = this.minPrice
    this.productShowcaseService.maxPrice = this.maxPrice
    this.productShowcaseService.categoryId = Number(this.categoryId)
    this.productShowcaseService.brandId = Number(this.brandId)
    this.productShowcaseService.targetGender = this.gender
    this.productShowcaseService.GetProductwithGivenFilter().subscribe({
      next: (response: ProductInfo[]) => this.productList = response,
      error: (error) => console.log(error)
    })
  }

  addToWishlist(productId:number){
    if (this.addedToWishList == false) {
      let wishlistItem:AddWishlist = {
        productId:Number(productId),
        userId:Number(this.userId)
      }
      this.userProfileService.addWishlistItem(this.userId,wishlistItem).subscribe({
        next:(response) => { console.log(response);
          this.addedToWishList = true},
          error:(error) => console.log(error)
          
      })
    }
  }
}
