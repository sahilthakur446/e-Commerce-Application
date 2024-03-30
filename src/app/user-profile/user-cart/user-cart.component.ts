import { Component, OnInit } from '@angular/core';
import { UserCart } from 'src/app/models/cart/user-cart.model';
import { UserCartService } from 'src/app/services/user-cart-service/user-cart.service';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {
  userId: string | null;
  cartId!:number;
  totalMRP:number = 0
  totalAmmount = 0
  userCartList!: UserCart[]
  quantity:number =1;
  showQuantityModal:boolean = false
  constructor(private userCartService: UserCartService) {
    this.userId = localStorage.getItem('userId')
  }

  ngOnInit(): void {
    this.getUserCartList()
    this.getPriceOfAllProductInCart()
  }

  saveCartId(cartId:number){
    this.cartId = cartId
    console.log(this.cartId);
    
  }

  removeCartItem(cartId:number){
    this.userCartService.removeCartItem(cartId).subscribe({
      next:() => this.getUserCartList(),
      error:(error) => console.log(error)
      
    })
  }

  updateQuantity(quantity:number){
    this.userCartService.updateCartItem(this.cartId,quantity).subscribe({
      next:() => this.getUserCartList(),
      error:(error) => console.log(error)
    })
  }

  toggleQuantityModal(){
    this.showQuantityModal = !this.showQuantityModal
  }

  getPriceOfAllProductInCart(){
    this.userCartService.getPriceOfAllProductInCart(this.userId).subscribe({
      next:(response:any) =>  {for(const price  of response) {
        this.totalMRP += price
      }
      this.totalAmmount = this.totalMRP + 49 + 20
    }
      
    })
  }

  getUserCartList() {
    this.userCartService.getUserCart(this.userId).subscribe({
      next: (response: UserCart[]) => {
        console.log(response);
        this.userCartList = response
      },
      error: (error:any) => console.log(error.message)
    })
  }
}
