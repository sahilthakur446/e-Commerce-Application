import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user-profile-service/user.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
isLoggedIn:boolean = false;
isSearchBarVisible:boolean = false;
showLogoutModal:boolean = false;

constructor(private authService:AuthService,private userService:UserService, private router:Router,) {
 }

 ngOnInit(): void {
  this.userService.getIsLoggedIn().pipe(
    delay(3000)
  ).subscribe(isLoggedIn => { 
    this.isLoggedIn = isLoggedIn;
  });
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
