import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';
import { UserService } from '../services/user-profile-service/user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{
welcome:boolean = false
userName:string = ''
userRole:string =''
constructor(private authService:AuthService,private userService:UserService) {

}
  ngOnInit(): void {
    this.userService.isUserLoggedIn().subscribe({
      next:(response)=> {response == true?this.welcome=true:this.welcome=false
      console.log(response);
      }
      
  });
  this.userService.getUserName().subscribe({
    next:(response)=> {this.userName = response
    console.log(this.userName);
    }
  });
  this.userService.getUserRole().subscribe({
    next:(response) => this.userRole = response
  })
  setTimeout(() => {
    this.welcome = false;
  }, 1000);
}
}
