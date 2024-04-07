import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAddress } from 'src/app/models/address/getUserAddress.model';
import { UserCart } from 'src/app/models/cart/user-cart.model';
import { AddUserOrder } from 'src/app/models/userOrder/addorder.model';
import { StorageService } from 'src/app/services/storage-service/storage.service';
import { UserCartService } from 'src/app/services/user-cart-service/user-cart.service';
import { UserOrderService } from 'src/app/services/user-order-service/user-order.service';
import { UserProfileManagementService } from 'src/app/services/user-profile-management-service/user-profile-management.service';
import { environment } from 'src/environments/environment';
declare var Razorpay: any;
@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {
  userId: string
  userEmail: string
  cartId!: number;
  totalMRP: number = 0;
  totalAmount: number = 0;
  userCartList: UserCart[] = [];
  quantity: number = 1;
  defaultAddress!: UserAddress;
  otherAddresses: UserAddress[] = [];
  showQuantityModal: boolean = false;
  selectAddress: boolean = false;
  isLoading:boolean =false;
  paymentId: any;
  selectedAddress!: UserAddress;
  paymentSuccess: boolean = false
  private readonly SHIPPING_COST: number = 49;
  private readonly PLATFORM_FEE: number = 20;
  constructor(
    private userCartService: UserCartService,
    private userProfileService: UserProfileManagementService,
    private httpClient: HttpClient,
    private storageService: StorageService,
    private userOrderService: UserOrderService,
    private router: Router
  ) {
    this.userId = this.storageService.getItem('userId') ?? ''
    console.log(this.userId);
    this.userEmail = this.storageService.getItem('userEmail') ?? ''
    console.log(this.userEmail);
  }
  ngOnInit(): void {
    this.getUserCartList();
    this.getPriceOfAllProductInCart();
    this.getAddresses();
  }
  saveCartId(cartId: number): void {
    this.cartId = cartId;
  }
  removeCartItem(cartId: number): void {
    this.userCartService.removeCartItem(cartId).subscribe({
      next: () => {
        this.getUserCartList();
        this.getPriceOfAllProductInCart();
        this.userCartService.getUserCartCount();
      },
      error: (error) => console.error(error)
    });
  }
  updateQuantity(quantity: number): void {
    this.userCartService.updateCartItem(this.cartId, quantity).subscribe({
      next: () => {
        this.getUserCartList();
        this.getPriceOfAllProductInCart();
        this.userCartService.getUserCartCount();
      },
      error: (error) => console.error(error)
    });
  }
  toggleQuantityModal(): void {
    this.showQuantityModal = !this.showQuantityModal;
  }
  getPriceOfAllProductInCart(): void {
    this.totalMRP = 0;
    this.totalAmount = 0;
    this.userCartService.getPriceOfAllProductInCart(this.userId).subscribe({
      next: (response: any) => {
        response.forEach((item: any) => {
          this.totalMRP += item.price * item.quantity;
        });
        this.totalAmount = this.totalMRP + this.SHIPPING_COST + this.PLATFORM_FEE;
      },
      error: (error) => console.error(error)
    });
  }
  getUserCartList(): void {
    this.isLoading = true;
    this.userCartService.getUserCart(this.userId).subscribe({
      next: (response: UserCart[]) => {
        this.userCartList = response;
        this.isLoading = false;
      },
      error: (error) => this.isLoading = false
    });
  }
  getAddresses(): void {
    this.userProfileService.getUserDefaultAddress(this.userId).subscribe({
      next: (response: UserAddress) => {
        this.defaultAddress = response;
        this.selectedAddress = this.defaultAddress
      },
      error: (error) => console.error(error)
    });
    this.userProfileService.getUserAddressesExcludingDefault(this.userId).subscribe({
      next: (response: UserAddress[]) => {
        this.otherAddresses = response;
        console.log(response);
      },
      error: (error) => console.error(error)
    });
  }
  choosenAddress(address: UserAddress) {
    this.selectedAddress = address
    console.log(this.selectedAddress);
  }

  removeCart(){
    this.userCartService.removeCart(this.userId).subscribe({
      next:() =>{
        this.userCartService.getCartCount()
        this.router.navigate(['/userdashboard/orders'])
      }
    })
  }

  saveOrderDetails() {
    let userOrderDetails: AddUserOrder = {
      userId: Number(this.userId),
      userCartItems: this.userCartList,
      paymentId: this.paymentId,
      totalAmount: this.totalAmount,
      userAddressId: this.selectedAddress.userAddressId
    }
    this.userOrderService.addUserOrder(this.userId, userOrderDetails).subscribe({
      next: (response) => this.removeCart(),
      error: (error) => console.log(error)
    })
  }
  initPayment() {
    let totalCost = this.totalAmount * 100
    let url = `${environment.apiUrl}api/Payment/initialize?amount=${totalCost}`
    this.httpClient.get<string>(url).subscribe({
      next: (orderId) => {
        console.log(orderId)
        this.payWithRazor(orderId, totalCost)
      }
    })
  }
  payWithRazor(orderId: string, totalCost: number) {
    let options = {
      "key": "rzp_test_JAwkgU8QccgoVb",
      "amount": totalCost,
      "currency": "INR",
      "name": "Elliye",
      "description": "Test Transaction",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw8ya9YncOZfbiDJIlq8UDM5cEzz8TBd9eSMZm2UlyJQ&s",
      "order_id": orderId,
      handler: async (response: any) => {
        this.paymentId = response.razorpay_payment_id;
        const data = {
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };
        console.log("data = ", data)
        this.httpClient.get(`${environment.apiUrl}api/Payment/confirm?paymentId=${this.paymentId}`).subscribe({
          next: (response: any) => {
            if (response.paymentstatus === 'captured') {
              this.saveOrderDetails()
            }
          }
        })
      },
      "prefill": {
        "name": this.selectedAddress.fullName,
        "email": this.userEmail,
        "contact": this.selectedAddress.mobileNumber
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#334155"
      }
    };
    let rzp = new Razorpay(options);
    rzp.open();
  }
  paymentSuccessModal() {
    this.paymentSuccess = true;
    setTimeout(() => {
      this.router.navigate(['Home'])
    }, 3000);
  }
}