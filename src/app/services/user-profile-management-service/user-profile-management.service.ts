import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { updateUser } from '../../models/user/update-user.model';
import { changePassword } from '../../models/user/change-password.model';
import { AuthService } from '../auth-service/auth.service';
import { filter, map } from 'rxjs';
import { UserAddress } from 'src/app/models/address/getUserAddress.model';
import { AddAddress } from 'src/app/models/address/add-address.model';
import { UpdateAddress } from 'src/app/models/address/update_address.model';
import { UserWishlist } from 'src/app/models/wishlist/user-wishlist.model';
import { AddWishlist } from 'src/app/models/wishlist/add-wishlist.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserProfileManagementService {
  private BaseApiUrl:string =`${environment.apiUrl}`;
 
  constructor(private http:HttpClient, private authService:AuthService) { 
   
  }

  getUserInfo(id:string){
    let url = `${this.BaseApiUrl}api/Users/GetUserInfo/${id}`;
    return this.http.get(url)
  }

  updateUser(id:string,updatedUser:updateUser){
    let url = `${this.BaseApiUrl}api/Users/UpdateUserInfo/${id}`;
    return this.http.put(url,updatedUser)
  }

  changePassword(id:string,passwordData:changePassword){
    let url = `${this.BaseApiUrl}api/Users/ChangePassword/${id}`;
    return this.http.put(url,passwordData)
  }

  deleteAccount(id:string){
    let url = `${this.BaseApiUrl}api/Users/DeleteUser/${id}`;
    return this.http.delete(url);
  }

  addAddress(addAddress:AddAddress,userId:string){
  let url =`${this.BaseApiUrl}api/UserProfile/SaveUserAddress/${userId}`;
  return this.http.post(url,addAddress);
  }

  updateAddress(updateAddress:UpdateAddress,addressId:number){
    let url = `${this.BaseApiUrl}api/UserProfile/UpdateUserAddress/${addressId}`;
    return this.http.put(url,updateAddress)
  }

  deleteAddress(addressId:number){
    let url = `${this.BaseApiUrl}api/UserProfile/DeleteUserAddress/${addressId}`;
    return this.http.delete(url);
  }

  setDefaultAddress(addressId:number){
    let url = `${this.BaseApiUrl}api/UserProfile/SetDefaultAddress/${addressId}`;
    return this.http.put(url,null);
  }

  getAddress(addressId:string|null){
    let url = `${this.BaseApiUrl}api/UserProfile/GetAddress/${addressId}`
    return this.http.get<UserAddress>(url);
  }

  getUserDefaultAddress(userId:string){
    let url = `${this.BaseApiUrl}api/UserProfile/GetDefaultUserAddress/${userId}`
    return this.http.get<UserAddress>(url);
  }

  getUserAddressesExcludingDefault(userId:string) {
    let url = `${this.BaseApiUrl}api/UserProfile/GetUserAllAddresses/${userId}`;
    return this.http.get<UserAddress[]>(url).pipe(
        map(response => response.filter(userAddress => userAddress.isDefault == false))
    );
}

  getUserWishlist(userId:string){
    let url =`${this.BaseApiUrl}api/UserProfile/GetUserAllWishlistProducts/${userId}`
    return this.http.get<UserWishlist[]>(url)
  }

  addWishlistItem(userId:string, wishlistItem:AddWishlist){
    let url =`${this.BaseApiUrl}api/UserProfile/AddToWishlist/${userId}`
    return this.http.post(url,wishlistItem)
  }

  removeWishlistItem(addressId:number){
    let url =`${this.BaseApiUrl}api/UserProfile/RemoveWishlistItem/${addressId}`
    return this.http.delete(url)
  }

}
