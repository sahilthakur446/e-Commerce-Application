import { Component, OnInit } from '@angular/core';
import { UserAddress } from 'src/app/models/address/getUserAddress.model';
import { OrderDetails } from 'src/app/models/userOrder/order-details.model';
import { StorageService } from 'src/app/services/storage-service/storage.service';
import { UserCartService } from 'src/app/services/user-cart-service/user-cart.service';
import { UserOrderService } from 'src/app/services/user-order-service/user-order.service';
import { UserProfileManagementService } from 'src/app/services/user-profile-management-service/user-profile-management.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {
  userId: string | null
  userOrders: OrderDetails[] = []
  userAddress!: UserAddress;
  isLoading:boolean = false;

  constructor(private userOrderService: UserOrderService, storageService: StorageService, private userProfileService: UserProfileManagementService, private userCartService:UserCartService) {
    this.userId = storageService.getItem('userId')
  }
  ngOnInit(): void {
    this.getUserOrders()
  }
  getUserOrders() {
    this.isLoading = true;
    this.userOrderService.getUserOrders(this.userId).subscribe({
      next: (orderDetails) => {
        this.userOrders = orderDetails
        this.isLoading = false;
        console.log(this.userOrders)
      },
      error:(error) => {console.log(error);
      this.isLoading = false}
      
    })
  }
}
