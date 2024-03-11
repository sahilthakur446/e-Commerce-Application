import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup,FormControl, Validators} from '@angular/forms'
import { AccountServiceService } from 'src/app/services/account-service/account-service.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
firstName:string = ""
lastName:string = ""
gender:string = ""
email:string = ""
password:string = ""
confirmpassword:string = "" 
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

onSubmit()
{
  console.log("Password ", this.password);
  
  const formData = new FormData();
  formData.append('FirstName',this.firstName)
  formData.append('LastName',this.lastName)
  formData.append('Gender',this.gender)
  formData.append('Email',this.email)
  formData.append('Password',this.password)
  formData.append('ConfirmPassword',this.confirmpassword)
  
  this.accountService.registerUser(formData).subscribe({
    next:(response) => console.log(response),
    error:(error) => console.log(error),
    complete:() => console.log("completed")
  })
}

}
