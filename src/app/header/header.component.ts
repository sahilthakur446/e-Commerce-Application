import { Component, OnInit, ChangeDetectorRef, HostListener, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../services/user-profile-service/user.service';
import { Observable, delay, filter } from 'rxjs';
import { UserCartService } from '../services/user-cart-service/user-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
isLoggedIn:boolean = false;
isSearchBarVisible:boolean = false;
showLogoutModal:boolean = false;
showLoginLogout:boolean = false;
isUserAdmin:boolean =  false;
isLogoutModalOpen = false;
cartCount$!:Observable<number>; 
constructor(private authService:AuthService,private userService:UserService,
   private router:Router, private userCartService: UserCartService) {
  this.router.events.pipe(
    filter(event => event instanceof NavigationEnd)
  ).subscribe((event:any) => {
    this.showLoginLogout = event.url !== '/Login';
  });
 this.userService.getUserRole().pipe(delay(2000)).subscribe({
  next:(response)=> {
    console.log(response);
    
    if (response === 'Admin') {
      this.isUserAdmin = true;
    }
  } 
 })
 this.cartCount$ = this.userCartService.getCartCount();
}

 ngOnInit(): void {
  this.userService.getIsLoggedIn().subscribe(isLoggedIn => { 
    this.isLoggedIn = isLoggedIn;
  });
  this.authService.isLoggedIn()
}

navigateToProduct(){
this.router.navigate(['products','newarrival'])
}



toggleUserModal() {
  this.isLogoutModalOpen = !this.isLogoutModalOpen;
}

logout(){
  this.authService.removeJwtToken()
  this.router.navigate(['Login'])
  this.userService.getIsLoggedIn().subscribe({
    next:(response)=> response == true?this.isLoggedIn=true:this.isLoggedIn=false
  })
}

openSearchBar(){
  this.isSearchBarVisible = !this.isSearchBarVisible;
}

toggleLogoutModal(){
this.showLogoutModal = !this.showLogoutModal
}
}
