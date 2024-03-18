import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user-profile-service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
isLoggedIn:boolean = false;
constructor(private authService:AuthService,private userService:UserService, private router:Router,) {
 }

 ngOnInit(): void {
  this.userService.isUserLoggedIn().subscribe({
    next: (response) => {
      if (response == true) {
        setTimeout(() => {
          this.isLoggedIn = true;
        }, 2100);
      } else {
        this.isLoggedIn = false;
      }
    }
  });
}


logout(){
  this.authService.removeToken()
  
  this.router.navigate(['Login'])
  this.userService.isUserLoggedIn().subscribe({
    next:(response)=> response == true?this.isLoggedIn=true:this.isLoggedIn=false
  })
}
checkIfLoggedIn(){
  
}
}
