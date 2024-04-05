import { Component, OnInit } from '@angular/core';
import { OrderDetailsWithPaymentStatus } from 'src/app/models/userOrder/order-details.model';
import { UserOrderService } from 'src/app/services/user-order-service/user-order.service';

@Component({
  selector: 'app-orders-management',
  templateUrl: './orders-management.component.html',
  styleUrls: ['./orders-management.component.css']
})
export class OrdersManagementComponent implements OnInit{
ordersListWithPaymentStatus:OrderDetailsWithPaymentStatus[] = []
isLoading:boolean = false;
constructor(private userOrderService: UserOrderService) {
}
  ngOnInit(): void {
    this.getUserOrdersListWithPaymentStatus()
  }
  getUserOrdersListWithPaymentStatus(){
    this.isLoading = true;
    this.userOrderService.getUserOrdersListWithPaymentStatus().subscribe({
      next:(response) => {this.ordersListWithPaymentStatus = response
      console.log(response);
      this.isLoading = false;
      },
      error:(error) => {console.log(error);
      this.isLoading = false} 
    })
  }

  changeOrderStatus(orderId:number,orderStatus:string){
    this.isLoading = true;
    this.userOrderService.changeOrderStatus(orderId,orderStatus).subscribe({
      next:(response) => {console.log(response)
      this.getUserOrdersListWithPaymentStatus()},
      error:(error) => {console.log(error);
      this.isLoading = false}      
    })
  }
}
