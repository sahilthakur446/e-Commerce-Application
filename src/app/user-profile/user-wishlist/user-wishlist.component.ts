import { Component, OnInit } from '@angular/core';
import { AddCart } from 'src/app/models/cart/add-cart.model';
import { UserWishlist } from 'src/app/models/wishlist/user-wishlist.model';
import { UserCartService } from 'src/app/services/user-cart-service/user-cart.service';
import { UserProfileManagementService } from 'src/app/services/user-profile-management-service/user-profile-management.service';

@Component({
  selector: 'app-user-wishlist',
  templateUrl: './user-wishlist.component.html',
  styleUrls: ['./user-wishlist.component.css']
})
export class UserWishlistComponent implements OnInit {
  userId!: string;
  addedToCart:boolean = false
  isLoading:boolean = false;
  userWishlistItems!: UserWishlist[]
  isResponseModalVisible:boolean = false
  isSuccess:boolean = false;
  responseMessage :string = ''
  constructor(private userProfileService: UserProfileManagementService, private userCartService:UserCartService) {
    this.userId = localStorage.getItem('userId')!
  }
  ngOnInit(): void {
    this.getUserWishlist();
  }

  getUserWishlist(){
    this.isLoading = true;
    this.userProfileService.getUserWishlist(this.userId).subscribe({
      next: (response: UserWishlist[]) => {this.userWishlistItems = response
      this.isLoading = false},
      error:(error) => this.showResponseModal(false,error.error)
    })
  }

  removeWishlistItem(wishlistId:number){
    this.userProfileService.removeWishlistItem(wishlistId).subscribe({
      next:(response) => {console.log(response)
      this.getUserWishlist()},
      error:(error) => this.showResponseModal(false,error.error)
    })
  }

  addToCart(productId:number){
    let carItem:AddCart = {
      productId: Number(productId),
      userId:Number(this.userId)
    }
    this.userCartService.addCartItem(this.userId,carItem).subscribe({
      next:(response:any) =>{ console.log(response);
         this.addedToCart = !this.addedToCart
          this.userCartService.getUserCartCount()
          this.showResponseModal(true,response.message)},
          error:(error) => this.showResponseModal(false,error.error)
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
