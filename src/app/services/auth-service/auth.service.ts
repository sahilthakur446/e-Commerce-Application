import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt'
import { UserService } from '../user-profile-service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  registerApiUrl = "https://localhost:7248/api/Users/Register";
  loginApiUrl = "https://localhost:7248/api/Users/Login";

  constructor(private http: HttpClient, private userService: UserService) { }
  
  registerUser(formData:FormData) {
    return this.http.post(this.registerApiUrl, formData)
      
  }

  loginUser(formData:FormData) {
    return this.http.post(this.loginApiUrl, formData)
  }

  storeToken(token:string){
    localStorage.setItem('jwtToken',token)
  }

  removeToken(){
    localStorage.clear()
    this.userService.setIsLoggedIn(false)
  }

  getToken(){
    return localStorage.getItem('jwtToken')
  }

  isLoggedIn():boolean{
    let x =  this.getToken() ? true : false;
    this.userService.setIsLoggedIn(x)
    return x
  }

  decodedToken(){
    const jwtHelperService = new JwtHelperService()
    const token = this.getToken()!
    const decodedToken = jwtHelperService.decodeToken(token)
    console.log(decodedToken);
    this.userService.setUserName(decodedToken.name)
    this.userService.setUserRole(decodedToken.userRole)
  }
}
