import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
isLoggedIn:boolean = false;
constructor(private authService:AuthService,
            private router:Router,
            ) { 
}
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn()
    console.log(this.isLoggedIn);
  }

logout(){
  this.authService.removeToken()
  this.router.navigate(['Login'])
}

}
