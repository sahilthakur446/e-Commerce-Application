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
  cartId!: number;
  totalMRP: number = 0
  totalAmmount = 0
  userCartList!: UserCart[]
  quantity: number = 1;
  showQuantityModal: boolean = false
  private readonly SHIPPING_COST = 49;
  private readonly PLATOFORM_FEE = 20;
  constructor(private userCartService: UserCartService) {
    this.userId = localStorage.getItem('userId')
  }

  ngOnInit(): void {
    this.getUserCartList()
    this.getPriceOfAllProductInCart()
  }

  saveCartId(cartId: number) {
    this.cartId = cartId
    console.log(this.cartId);

  }

  removeCartItem(cartId: number) {
    this.userCartService.removeCartItem(cartId).subscribe({
      next: () => {
        this.getUserCartList()
        this.getPriceOfAllProductInCart()
      },
      error: (error) => console.log(error)

    })
  }

  updateQuantity(quantity: number) {
    this.userCartService.updateCartItem(this.cartId, quantity).subscribe({
      next: () => {
        this.getUserCartList()
        this.getPriceOfAllProductInCart()
      },
      error: (error) => console.log(error)
    })
  }

  toggleQuantityModal() {
    this.showQuantityModal = !this.showQuantityModal
  }

  getPriceOfAllProductInCart() {
    this.totalMRP = 0
    this.totalAmmount = 0
    this.userCartService.getPriceOfAllProductInCart(this.userId).subscribe({
      next: (response: any) => {
        console.log(response);

        for (const object of response) {
          this.totalMRP += object.price * object.quantity
        }
        this.totalAmmount = this.totalMRP + this.SHIPPING_COST + this.PLATOFORM_FEE
        console.log(this.totalAmmount, this.totalMRP);
      }
    })
  }

  getUserCartList() {
    this.userCartService.getUserCart(this.userId).subscribe({
      next: (response: UserCart[]) => {
        console.log(response);
        this.userCartList = response
      },
      error: (error: any) => console.log(error.message)
    })
  }
}
