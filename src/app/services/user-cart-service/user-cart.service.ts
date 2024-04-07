import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { AddCart } from 'src/app/models/cart/add-cart.model';
import { UpdateCart } from 'src/app/models/cart/update-cart-item';
import { UserCart } from 'src/app/models/cart/user-cart.model';
import { StorageService } from '../storage-service/storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserCartService {
  private BaseApiUrl:string =`${environment.apiUrl}`;
  private cartCount$ = new BehaviorSubject(0)
  cartCountUpdated = new EventEmitter<number>();
  constructor(private http:HttpClient,private storageService:StorageService) 
  {
    
    this.getUserCartCount()
  }

  private setCartCount(value:number){
    this.cartCount$.next(value);
  }

  getCartCount():Observable<number>{
    return this.cartCount$.asObservable()
  }

  getUserCartCount(){
    let userId = this.storageService.getItem('userId') 
    let url = `${this.BaseApiUrl}api/UserCart/GetUserCartCount/${userId}`
    this.http.get<number>(url).subscribe({
      next:(count) => {this.setCartCount(count)
        console.log(`count: ${count}, userID: ${userId}`);
      },
      error:() => this.setCartCount(0)
    })
  }

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

  removeCart(userId:string|null){
    let url = `${this.BaseApiUrl}api/UserCart/RemoveUserCart/${userId}`
    return this.http.delete(url)
  }

  getPriceOfAllProductInCart(userId: string | null) {
    let url = `${this.BaseApiUrl}api/UserCart/GetUserCartProducts/${userId}`;
    return this.http.get<UserCart[]>(url).pipe(
      map(response => response.map(x => ({ price: x.price, quantity: x.quantity })))
    );
  }
  
  
}
