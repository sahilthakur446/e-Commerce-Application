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
  formGroup:FormGroup;

  constructor(private accountService: AccountServiceService) {
   
    this.formGroup = new FormGroup(
      {
        firstname: new FormControl('', Validators.required),
        lastname: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        confirmpassword: new FormControl('', Validators.required),
      }
    )
    }
  post() {
    this.accountService.formData = this.formGroup.value
    return this.accountService.registerUser();
  }
}

