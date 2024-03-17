import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  registerApiUrl = "https://localhost:7248/api/Users/Register";
  loginApiUrl = "https://localhost:7248/api/Users/Login";

  constructor(private http: HttpClient) { }

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
  }

  getToken(){
    return localStorage.getItem('jwtToken')
  }

  isLoggedIn():boolean{
    return this.getToken() ? true : false;
  }
}
