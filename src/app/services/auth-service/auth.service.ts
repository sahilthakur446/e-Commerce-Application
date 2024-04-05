import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt'
import { UserService } from '../user-profile-service/user.service';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from '../storage-service/storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  registerApiUrl = "https://localhost:7248/api/Users/Register";
  loginApiUrl = "https://localhost:7248/api/Users/Login";
  registeredUserEmail$ = new BehaviorSubject<string>('') 
  registeredUserPassword$ = new BehaviorSubject<string>('')
  private userRole:string =''
  constructor(private http: HttpClient, private userService: UserService, private storageService:StorageService) { }
  
  loginUser(loginFormData: FormData) {
    return this.http.post(this.loginApiUrl, loginFormData);
  }
  
  registerUser(registrationFormData: FormData) {
    return this.http.post(this.registerApiUrl, registrationFormData);
  }
  
  setNewRegisteredEmailAndPassword(email:string, password:string){
    this.registeredUserEmail$.next(email)
    this.registeredUserPassword$.next(password)
  }

  getNewRegisteredEmail(){
    return this.registeredUserEmail$.asObservable()
  }

  getNewRegisteredPassword(){
    return this.registeredUserPassword$.asObservable()
  }

  storeJwtToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }
  removeJwtToken() {
    localStorage.clear();
    this.userService.setIsLoggedIn(false);
  }
  retrieveJwtToken(token:string) {
    return localStorage.getItem(token);
  }
getUserID()
{
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
    const hasToken = this.retrieveJwtToken('jwtToken') !== null;
    const userName = localStorage.getItem('userName');
    this.userService.setUserName(userName!);
    this.userService.setIsLoggedIn(hasToken);
    return hasToken;
  }
  decodeJwtToken() {
    const jwtHelperService = new JwtHelperService();
    const token = this.retrieveJwtToken('jwtToken')!;
    const decodedToken = jwtHelperService.decodeToken(token);
    this.userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    this.userService.setUserName(decodedToken.name);
    this.storageService.setItem('userEmail',decodedToken.email)
    localStorage.setItem('userId',decodedToken.userid);
    localStorage.setItem('userName',decodedToken.name);
    this.userService.setUserRole(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
  }
}