import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userName$ = new BehaviorSubject<string>('');
  private userRole$ = new BehaviorSubject<string>('');
  private loggedInStatus$ = new BehaviorSubject<boolean>(false);
 

  constructor() { }

  setIsLoggedIn(isLoggedIn: boolean) { // Updated method name
    this.loggedInStatus$.next(isLoggedIn);
  }

  getIsLoggedIn() { 
    return this.loggedInStatus$.asObservable();
  }

  getUserName() {
    return this.userName$.asObservable();
  }

  setUserName(name: string) {
    this.userName$.next(name);
  }

  getUserRole() {
    return this.userRole$.asObservable();
  }

  setUserRole(role: string) {
    this.userRole$.next(role);
  }
}
