import { Component } from '@angular/core';
import { AccountServiceService } from 'src/app/services/account-service/account-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
email:string = ""
password:string = ""
passwordFieldType:string = "password"
passwordViewIconClass  = "bi bi-eye-slash-fill text-slate-700 text-xl bg-slate-100 px-1"
isPasswordVisible:boolean = false;
constructor(private accountService: AccountServiceService) {
}

togglePasswordVisibility()
{
  this.isPasswordVisible = !this.isPasswordVisible
  if (this.isPasswordVisible) {
    this.passwordFieldType = "text"
    this.passwordViewIconClass = "bi bi-eye-fill text-slate-700 text-xl bg-slate-100 px-1"
  }
  else
  {
    this.passwordFieldType = "password"
    this.passwordViewIconClass = "bi bi-eye-slash-fill text-slate-700 text-xl bg-slate-100 px-1"
  }
}
onSubmit(){
  const formData = new FormData()
  formData.append("Email",this.email)
  formData.append("Password",this.password)
  this.accountService.loginUser(formData).subscribe({
    next: (response) => console.log(response),
    error: (error) => console.log(error),
    complete: () => console.log("Completed")  
  })
}
}
