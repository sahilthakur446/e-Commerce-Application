import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
password:string = ""
confirmpassword:string = "" 
passwordFieldType:string = "password"
passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z])(.{8,})$/;
passwordViewIconClass  = "bi bi-eye-slash-fill text-slate-700 text-xl px-1"
isPasswordVisible:boolean = false;
isModalVisible:boolean = false;
responseMessage:string = '';
responseClass: string = '';
responseSuccessClass: string = 'text-3xl font-bold text-green-700';
responseFailureClass: string = 'text-3xl font-bold text-red-700';
isLoading:boolean = false;
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
  this.isLoading = true;
  const formData = new FormData();
  formData.append('FirstName',this.firstName)
  formData.append('LastName',this.lastName)
  formData.append('Gender',this.gender)
  formData.append('Email',this.email)
  formData.append('Password',this.password)
  formData.append('ConfirmPassword',this.confirmpassword)
  this.authService.registerUser(formData).subscribe({
    next: (response: any) => {
      this.responseMessage = response.message
      this.authService.setNewRegisteredEmailAndPassword(this.email,this.password);
      this.responseClass = this.responseSuccessClass;
      this.isLoading = false;
      this.displayResponseModal('success');
      },
      error: (response) => {
        response.error.message?this.responseMessage = response.error.message:this.responseMessage = "Signup Failed Due to Internal Server Issue"
        this.isLoading = false;
        this.displayResponseModal('failure');
        },
      complete: () => console.log("Completed")  
    });
  }
    displayResponseModal(result:string){
      if (result === 'success') {
        this.responseClass = this.responseSuccessClass;
        this.isModalVisible = true;
        this.isLoading = false;
        setTimeout(() => {
          this.isModalVisible = false;
          this.router.navigate(['login'])
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
