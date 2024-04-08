import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddUserOrder } from 'src/app/models/userOrder/addorder.model';
import { OrderDetails, OrderDetailsWithPaymentStatus } from 'src/app/models/userOrder/order-details.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserOrderService {
  baseApiUrl = `${environment.apiUrl}api/`
  constructor(private http: HttpClient) { }

  addUserOrder(userId:number|string,userOrderDetails:AddUserOrder){
    let apiUrl = `${this.baseApiUrl}UserOrder/AddUserOrder/${userId}`
    return this.http.post(apiUrl,userOrderDetails)
  }

  getUserOrders(userId:number|string | null){
    let apiUrl = `${this.baseApiUrl}UserOrder/GetUserOrders/${userId}`
    return this.http.get<OrderDetails[]>(apiUrl)
  }

  getUserOrdersListWithPaymentStatus(){
    let apiUrl = `${this.baseApiUrl}UserOrder/GetUserOrderListWihtPaymentStatusAsync`
    return this.http.get<OrderDetailsWithPaymentStatus[]>(apiUrl)
  }

  changeOrderStatus(orderId:number,orderStatus:string){
    let apiUrl = `${this.baseApiUrl}UserOrder/ChangeOrderStatus/${orderId}?orderStatus=${orderStatus}`
    return this.http.post(apiUrl,null)
  }
}
