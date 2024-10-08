import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductShowcaseService } from '../services/product-showcase-service/product-showcase.service';
import { ProductInfo } from '../models/product/product.model';
import { UserProfileManagementService } from '../services/user-profile-management-service/user-profile-management.service';
import { AddWishlist } from '../models/wishlist/add-wishlist.model';
import { UserCartService } from '../services/user-cart-service/user-cart.service';
import { AddCart } from '../models/cart/add-cart.model';
import { StorageService } from '../services/storage-service/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  userId!: string
  productId: string | null = ''
  productDetails!: ProductInfo;
  addedToWishList: boolean = false;
  wishlistText: string = 'Wishlist'
  addedToCart: boolean = false;
  originalMRP: number = 0
  discount: number = 0
  isResponseModalVisible: boolean = false;
  isSuccess: boolean = false;
  responseMessage: string = ''
  isLoading: boolean = false;
  environmentVariable:string = environment.apiUrl
  constructor(route: ActivatedRoute, private productShowcaseService: ProductShowcaseService,
    private userProfileService: UserProfileManagementService, private userCartService: UserCartService,
    private storageService: StorageService) {
    this.userId = this.storageService.getItem('userId')!
    this.productId = route.snapshot.paramMap.get('productid')
  }
  ngOnInit(): void {
    this.getProduct();
  }
  getProduct() {
    this.isLoading = true;
    this.productShowcaseService.getProduct(this.productId!).subscribe({
      next: (response: ProductInfo) => {
        this.productDetails = response
        this.originalMRP = Math.floor(this.productDetails.price * (Math.random() + 1))
        this.discount = Math.ceil(((this.originalMRP - this.productDetails.price) / this.originalMRP) * 100)
        this.isLoading =false;
      },
      error: () => this.showResponseModal(false, "Some error occured")
    })
  }

  addToWishlist() {
    if (this.addedToWishList == false) {
      let wishlistItem: AddWishlist = {
        productId: Number(this.productId),
        userId: Number(this.userId)
      }
      this.userProfileService.addWishlistItem(this.userId, wishlistItem).subscribe({
        next: () => {
          this.addedToWishList = true
          this.wishlistText = this.wishlistText == 'Wishlist' ? 'Wishlisted' : 'Wishlist'

        },
        error: (error) => this.showResponseModal(false, error.error)
      })
    }
  }

  addtoCart() {
    let carItem: AddCart = {
      productId: Number(this.productId),
      userId: Number(this.userId)
    }
    this.userCartService.addCartItem(this.userId, carItem).subscribe({
      next: (response: any) => {
        this.addedToCart = !this.addedToCart
        this.userCartService.getUserCartCount()
        this.showResponseModal(true, response.message)
      },
      error: (error) => this.showResponseModal(false, error.error)
    })
  }

  showResponseModal(success: boolean, message: string) {
    this.isLoading = false;
    this.isResponseModalVisible = true;
    this.isSuccess = success;
    this.responseMessage = message;
    setTimeout(() => {
      this.isResponseModalVisible = false;
    }, 3000);
  }
}
