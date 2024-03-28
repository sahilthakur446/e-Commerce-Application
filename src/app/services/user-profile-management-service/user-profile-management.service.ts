import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { updateUser } from '../../models/user/update-user.model';
import { changePassword } from '../../models/user/change-password.model';
import { AuthService } from '../auth-service/auth.service';
import { filter, map } from 'rxjs';
import { UserAddress } from 'src/app/models/address/getUserAddress.model';
@Injectable({
  providedIn: 'root'
})
export class UserProfileManagementService {
  private BaseApiUrl:string ='https://localhost:7248/';
  private UserId;
  constructor(private http:HttpClient, private authService:AuthService) { 
    this.UserId = this.authService.retrieveJwtToken('userId')!
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

  addAddress(addAddress:any){
  let url =`${this.BaseApiUrl}api/UserProfile/SaveUserAddress/${this.UserId}`;
  return this.http.post(url,addAddress);
  }

  getUserDefaultAddress(){
    let url = `${this.BaseApiUrl}api/UserProfile/GetDefaultUserAddress/${this.UserId}`
    return this.http.get<UserAddress>(url);
  }

  getUserAddressesExcludingDefault() {
    let url = `${this.BaseApiUrl}api/UserProfile/GetUserAllAddresses/${this.UserId}`;
    return this.http.get<UserAddress[]>(url).pipe(
        map(response => response.filter(userAddress => userAddress.isDefault == false))
    );
}

}
