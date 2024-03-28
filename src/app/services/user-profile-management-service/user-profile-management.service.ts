import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { updateUser } from '../../models/user/update-user.model';
import { changePassword } from '../../models/user/change-password.model';
@Injectable({
  providedIn: 'root'
})
export class UserProfileManagementService {
  private BaseApiUrl:string ='https://localhost:7248/';
  constructor(private http:HttpClient) { }

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

  addAddress(userId:string,addAddress:any){
  let url =`${this.BaseApiUrl}api/UserProfile/SaveUserAddress/${userId}`;
  return this.http.post(url,addAddress);
  }
}
