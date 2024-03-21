import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt'
import { UserService } from '../user-profile-service/user.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  registerApiUrl = "https://localhost:7248/api/Users/Register";
  loginApiUrl = "https://localhost:7248/api/Users/Login";
  private userRole:string =''

  constructor(private http: HttpClient, private userService: UserService) { }

  registerUser(registrationFormData: FormData) {
    return this.http.post(this.registerApiUrl, registrationFormData);
  }

  loginUser(loginFormData: FormData) {
    return this.http.post(this.loginApiUrl, loginFormData);
  }

  storeJwtToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }

  removeJwtToken() {
    localStorage.clear();
    this.userService.setIsLoggedIn(false);
  }

  retrieveJwtToken() {
    return localStorage.getItem('jwtToken');
  }
  
  isUserAdmin():boolean{
    if (this.userRole == 'Admin') {
      console.log('Admin');
      
      return true;
    }
    else{
      console.log('userRole', this.userRole);
      
      console.log('Not Admin');
    return false;
    }

  }

  isLoggedIn(): boolean {
    const hasToken = this.retrieveJwtToken() !== null;
    const userName = localStorage.getItem('userName');
    this.userService.setUserName(userName!);
    this.userService.setIsLoggedIn(hasToken); 
    return hasToken;
  }

  decodeJwtToken() {
    const jwtHelperService = new JwtHelperService();
    const token = this.retrieveJwtToken()!; // Assume token exists
    const decodedToken = jwtHelperService.decodeToken(token);
    this.userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    this.userService.setUserName(decodedToken.name);
    localStorage.setItem('userName',decodedToken.name);
    this.userService.setUserRole(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
  }
}
