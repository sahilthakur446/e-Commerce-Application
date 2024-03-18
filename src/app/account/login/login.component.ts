import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
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

constructor(private authService: AuthService, private router:Router) {
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
    this.authService.storeToken(response.jwtToken)
    this.authService.decodedToken()
    this.authService.isLoggedIn()
    this.responseMessage = response.message;
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
