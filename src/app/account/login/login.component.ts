import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractControl, FormControl, FormControlName, FormGroup } from '@angular/forms';
import { AccountServiceService } from 'src/app/services/account-service/account-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
loginForm:FormGroup;
products:any
brandName:string = ""
constructor(private accountService: AccountServiceService, private http: HttpClient) {
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
//-------------------------------------------------------------------------------//

getProducts(){
  let url = "https://localhost:7248/api/Product/GetAllProducts"
  this.http.get(url).subscribe((response:any)=> {
    console.log(response);
    
    this.products = Object.entries(response)
    console.log(this.products);
    
  for (const iterator of this.products) {
    console.log(iterator[1]);
    console.log(`Product Name = ${iterator[1].productName}`);
    console.log(`Product Name = ${iterator[1].productDescription}`);
    console.log(`Product Name = ${iterator[1].price}`);
    console.log(`Product Name = ${iterator[1].imagePath}`);
    console.log(`Product Name = ${iterator[1].stockQuantity}`);
  }
  }
  )
}
getProductswithSpecificBrand(){
  let url = `https://localhost:7248/api/Product/GetProductswithSpecificBrand?brandName=${this.brandName}`
  this.http.post(url,null).subscribe((response:any) => {this.products = Object.entries(response.$values[0].products.$values)
  })
}


}
