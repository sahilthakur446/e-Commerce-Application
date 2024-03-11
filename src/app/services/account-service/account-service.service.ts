import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {
  registerApiUrl = "https://localhost:7248/api/Users/Register";
  loginApiUrl = "https://localhost:7248/api/Users/Login";

  constructor(private http: HttpClient) { }

  registerUser(formData:FormData) {
    return this.http.post(this.registerApiUrl, formData)
      
  }

  loginUser(formData:FormData) {
    return this.http.post(this.loginApiUrl, formData)
  }
}
