import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserAddress } from 'src/app/models/address/getUserAddress.model';
import { UserCart } from 'src/app/models/cart/user-cart.model';
import { UserCartService } from 'src/app/services/user-cart-service/user-cart.service';
import { UserProfileManagementService } from 'src/app/services/user-profile-management-service/user-profile-management.service';
declare var Razorpay:any;
@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {
  userId: string = localStorage.getItem('userId') ?? '';
  cartId!: number;
  totalMRP: number = 0;
  totalAmount: number = 0;
  userCartList: UserCart[] = [];
  quantity: number = 1;
  defaultAddress!: UserAddress;
  otherAddresses: UserAddress[] = [];
  showQuantityModal: boolean = false;
  selectAddress: boolean = false;
  selectedAddress!: UserAddress;
  private readonly SHIPPING_COST: number = 49;
  private readonly PLATFORM_FEE: number = 20;

  constructor(
    private userCartService: UserCartService,
    private userProfileService: UserProfileManagementService,
    private httpClient: HttpClient
  ) {}

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
    this.userCartService.getUserCart(this.userId).subscribe({
      next: (response: UserCart[]) => {
        this.userCartList = response;
      },
      error: (error) => console.error(error.message)
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

  choosenAddress(addressId:number, address:UserAddress){
    this.selectedAddress = address
    console.log(this.selectedAddress);
    
  }

  initPayment(){
    let totalCost = this.totalAmount * 100
    let url = `https://localhost:7248/api/Payment/initialize?amount=${totalCost}`
    this.httpClient.get<string>(url).subscribe({
      next:(orderId) => {console.log(orderId)
        this.payWithRazor(orderId,totalCost)}
    })
  }

  payWithRazor(orderId:string,totalCost:number) {
    let options = {
      "key": "rzp_test_JAwkgU8QccgoVb", // Enter the Key ID generated from the Dashboard
      "amount": totalCost, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Your Company Name",
      "description": "Test Transaction",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw8ya9YncOZfbiDJIlq8UDM5cEzz8TBd9eSMZm2UlyJQ&s",
      "order_id": orderId,
      handler: async function (response:any) {
        const data = {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
        };
        console.log("data = ",data)
    },
      "prefill": {
          "name": "Gaurav Kumar",
          "email": "gaurav.kumar@example.com",
          "contact": "9999999999"
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


}

