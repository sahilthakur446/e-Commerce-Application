import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';


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
passwordViewIconClass  = "bi bi-eye-slash-fill text-slate-700 text-xl px-1"
isPasswordVisible:boolean = false;
isModalVisible:boolean = false;
responseMessage:string = '';
responseClass: string = '';
responseSuccessClass: string = 'text-3xl font-bold text-green-700';
responseFailureClass: string = 'text-3xl font-bold text-red-700';

constructor(private authService: AuthService) {
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
  
  this.authService.registerUser(formData).subscribe({
    next: (response: any) => {console.log(response)
      this.responseMessage = response.message;
      this.responseClass = this.responseSuccessClass;
      this.isModalVisible = true;
      setTimeout(() => {
        this.isModalVisible = false;
      }, 2000);
      },
      error: (response) => {console.log(response)
        response.error.message?this.responseMessage = response.error.message:this.responseMessage = "Signup Failed Due to Internal Server Issue"
        this.responseClass = this.responseFailureClass;
        this.isModalVisible = true;
        setTimeout(() => {
          this.isModalVisible = false;
        }, 4000);
        },
      complete: () => console.log("Completed")  
    })
}

}
