import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { UserService } from 'src/app/services/user-profile-service/user.service';
import { WelcomeService } from 'src/app/services/welcome-service/welcome.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
email:string = ""
password:string = ""
passwordFieldType:string = "password"
passwordViewIconClass  = "bi bi-eye-slash-fill text-slate-700 text-xl px-1"
isPasswordVisible:boolean = false;
readyForSubmission: boolean = true;
isLoading:boolean = false;
isModalVisible:boolean = false;
responseMessage:string = '';
responseClass: string = '';
responseSuccessClass: string = 'text-3xl font-bold text-green-700';
responseFailureClass: string = 'text-3xl font-bold text-red-700';

constructor(private authService: AuthService,private welcomeService:WelcomeService, private router:Router) {
}
  ngOnInit(): void {
    this.getNewlyRegisteredUserEmailAndPassword()
  }

  getNewlyRegisteredUserEmailAndPassword(){
    this.authService.getNewRegisteredEmail().subscribe({
      next:(email) => this.email = email ?? '',
      error:(error) => console.log(error)
    })

    this.authService.getNewRegisteredPassword().subscribe({
      next:(password) => this.password = password ?? '',
      error:(error) => console.log(error)
    })
  }

togglePasswordVisibility()
{
  this.isPasswordVisible = !this.isPasswordVisible
  if (this.isPasswordVisible) {
    this.passwordFieldType = "text"
    this.passwordViewIconClass = "bi bi-eye-fill text-slate-700 text-xl px-1"
  }
  else
  {
    this.passwordFieldType = "password"
    this.passwordViewIconClass = "bi bi-eye-slash-fill text-slate-700 text-xl px-1"
  }
}
onSubmit(){
  if (!this.email || !this.password) {
    this.readyForSubmission = false;
    return;
  }
  this.isLoading = true;
  const formData = new FormData()
  formData.append("Email",this.email)
  formData.append("Password",this.password)
  this.authService.loginUser(formData).subscribe({
    next: (response: any) => {console.log(response)
    this.authService.storeJwtToken(response.jwtToken)
    this.authService.decodeJwtToken()
    this.authService.isLoggedIn()
    this.authService.isUserAdmin()
    this.responseMessage = response.message;
    this.welcomeService.setShowWelcome(true)
    this.displayResponseModal('success')
    },
    error: (response) => {console.log(response)
      response.error.message? this.responseMessage = response.error.message: this.responseMessage = "Login Failed Due to Internal Server Issue"
      this.displayResponseModal('failure')
      this.authService.isLoggedIn()
      },
    complete: () => console.log("Completed")  
  })
}

displayResponseModal(result:string){
  if (result === 'success') {
    this.responseClass = this.responseSuccessClass;
    this.isModalVisible = true;
    this.isLoading = false;
    setTimeout(() => {
      this.isModalVisible = false;
      this.router.navigate(['Home'])
    }, 2000);
    
  }else{
    this.responseClass = this.responseFailureClass;
      this.isModalVisible = true;
      this.isLoading = false;
      setTimeout(() => {
        this.isModalVisible = false;
      }, 2000);
  }

}

}
