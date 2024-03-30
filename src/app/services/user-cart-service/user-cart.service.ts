import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AddCart } from 'src/app/models/cart/add-cart.model';
import { UpdateCart } from 'src/app/models/cart/update-cart-item';
import { UserCart } from 'src/app/models/cart/user-cart.model';

@Injectable({
  providedIn: 'root'
})
export class UserCartService {
  private BaseApiUrl:string ='https://localhost:7248/';
  constructor(private http:HttpClient) { }

  getUserCart(userId:string|null){
    let url = `${this.BaseApiUrl}api/UserCart/GetUserCartProducts/${userId}`
    return this.http.get<UserCart[]>(url)
  }
  addCartItem(userId:string|null, cartItem:AddCart){
    let url = `${this.BaseApiUrl}api/UserCart/AddProductInCart/${userId}`
    return this.http.post(url,cartItem)
  }
  updateCartItem(userCartId:number,updatedQuantity:number){
    let updatedCartItem:UpdateCart = {
      quantity:updatedQuantity
    }
    let url = `${this.BaseApiUrl}api/UserCart/UpdateProductInCart/${userCartId}`
    return this.http.put(url,updatedCartItem)
  }
  removeCartItem(userCartId:number){
    let url = `${this.BaseApiUrl}api/UserCart/RemoveProductInCart/${userCartId}`
    return this.http.delete(url)
  }

  getPriceOfAllProductInCart(userId: string | null) {
    let url = `${this.BaseApiUrl}api/UserCart/GetUserCartProducts/${userId}`;
    return this.http.get<UserCart[]>(url).pipe(
      map(response => response.map(x => x.price))
    );
  }
  
}
