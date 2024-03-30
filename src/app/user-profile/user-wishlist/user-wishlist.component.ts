import { Component, OnInit } from '@angular/core';
import { UserWishlist } from 'src/app/models/wishlist/user-wishlist.model';
import { UserProfileManagementService } from 'src/app/services/user-profile-management-service/user-profile-management.service';

@Component({
  selector: 'app-user-wishlist',
  templateUrl: './user-wishlist.component.html',
  styleUrls: ['./user-wishlist.component.css']
})
export class UserWishlistComponent implements OnInit {
  userId!: string;
  userWishlistItems!: UserWishlist[]
  constructor(private userProfileService: UserProfileManagementService) {
    this.userId = localStorage.getItem('userId')!
  }
  ngOnInit(): void {
    this.getUserWishlist();
  }

  getUserWishlist(){
    this.userProfileService.getUserWishlist(this.userId).subscribe({
      next: (response: UserWishlist[]) => {
        console.log(response)
        this.userWishlistItems = response
      }
    })
  }

  removeWishlistItem(wishlistId:number){
    this.userProfileService.removeWishlistItem(wishlistId).subscribe({
      next:(response) => {console.log(response)
      this.getUserWishlist()}
      
    })
  }

  addToCart(productId:number){
  }
}
