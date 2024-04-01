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
  userWishlistItems!: UserWishlist[]
  constructor(private userProfileService: UserProfileManagementService, private userCartService:UserCartService) {
    this.userId = localStorage.getItem('userId')!
  }
  ngOnInit(): void {
    this.getUserWishlist();
  }

  getUserWishlist(){
    this.userProfileService.getUserWishlist(this.userId).subscribe({
      next: (response: UserWishlist[]) => this.userWishlistItems = response
    })
  }

  removeWishlistItem(wishlistId:number){
    this.userProfileService.removeWishlistItem(wishlistId).subscribe({
      next:(response) => {console.log(response)
      this.getUserWishlist()}
      
    })
  }

  addToCart(productId:number){
    let carItem:AddCart = {
      productId: Number(productId),
      userId:Number(this.userId)
    }
    this.userCartService.addCartItem(this.userId,carItem).subscribe({
      next:(response) =>{ console.log(response);
         this.addedToCart = !this.addedToCart}
    })
  }
}
