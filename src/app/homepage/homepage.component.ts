import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';
import { UserService } from '../services/user-profile-service/user.service';
import { WelcomeService } from '../services/welcome-service/welcome.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{
welcome:boolean = false
userName:string = ''
userRole:string =''
constructor(private userService:UserService, private welcomeService:WelcomeService) {
  this.welcomeService.getShowWelcome().subscribe({
    next:(response)=> {response == true?this.welcome=true:this.welcome=false
    console.log(response);
    }  
});
}

  ngOnInit(): void {
   
  this.userService.getUserName().subscribe({
    next:(response)=> {this.userName = response
    }
  });
  this.userService.getUserRole().subscribe({
    next:(response) => this.userRole = response
  })
  setTimeout(() => {
    this.welcome = false;
    this.welcomeService.setShowWelcome(false);
  }, 2500);
}
}
