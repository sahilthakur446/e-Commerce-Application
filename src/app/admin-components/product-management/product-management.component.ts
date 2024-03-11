import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit{
  productList:any;
  constructor(private http: HttpClient) {
    
  }
  ngOnInit(): void {
    let url = "https://localhost:7248/api/Product/GetAllProducts"
    this.http.get(url).subscribe({
      next:(response) => {console.log(response)
      this.productList = response},
      error:(error) => console.log(error),
      complete:() => console.log("Completed") 
    })
  }
}
