import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private userName$ = new BehaviorSubject<string>('')
private userRole$ = new BehaviorSubject<string>('')
private isLoggedIn$ = new BehaviorSubject<boolean>(false)

  constructor() {
   }

  public setIsLoggedIn(value:boolean){
    this.isLoggedIn$.next(value)
  }

  public getIsLoggedIn(value:boolean){
    
    return this.isLoggedIn$.asObservable();
  }

  public getUserName(){
    
    return this.userName$.asObservable();
  }

  public setUserName(name:string){
    
    this.userName$.next(name)
  }

  public getUserRole(){
    return this.userRole$.asObservable();
  }

  public setUserRole(role:string){
    this.userRole$.next(role)
  }

  public isUserLoggedIn(){
    return this.isLoggedIn$.asObservable();
  }
}
