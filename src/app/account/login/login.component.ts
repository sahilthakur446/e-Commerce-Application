import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormControlName, FormGroup } from '@angular/forms';
import { AccountServiceService } from 'src/app/services/account-service/account-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
loginForm:FormGroup;

constructor(private accountService: AccountServiceService) {
  this.loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
}
get password():any
{
  return this.loginForm.get('password')?.value
}
get email():AbstractControl | null
{
  return this.loginForm?.get('email')
}
post(){
  this.accountService.formData = this.loginForm.value
  return this.accountService.loginUser();
}
}
