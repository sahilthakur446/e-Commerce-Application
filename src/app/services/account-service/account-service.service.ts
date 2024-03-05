import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {
  registerApiUrl = "https://localhost:7248/api/Users/Register";
  loginApiUrl = "https://localhost:7248/api/Users/Login";
  formData: FormData = new FormData(); // More specific than 'formData'

  constructor(private http: HttpClient) { }

  registerUser() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.registerApiUrl, this.formData, { headers })
      .subscribe((response) => {
        console.log(response);
      });
  }

  loginUser() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.loginApiUrl, this.formData, { headers }) // Assuming login also uses 'registrationData'
      .subscribe((response) => {
        console.log(response);
      });
  }
}
