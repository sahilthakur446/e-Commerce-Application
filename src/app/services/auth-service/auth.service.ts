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

  isLoggedIn(): boolean {
    const hasToken = this.retrieveJwtToken() !== null;
    this.userService.setIsLoggedIn(hasToken); 
    return hasToken;
  }

  decodeJwtToken() {
    const jwtHelperService = new JwtHelperService();
    const token = this.retrieveJwtToken()!; // Assume token exists
    const decodedToken = jwtHelperService.decodeToken(token);
    this.userService.setUserName(decodedToken.name);
    this.userService.setUserRole(decodedToken.userRole);
  }
}
