import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit{
  productList:any;
  categoryList:any;
  BrandList:any;
  selectedCategory:string ="";
  selectedBrand:string = "";
  isLoading:boolean = false;
  constructor(private http: HttpClient) {
  }

  applyFilters()
  {
    this.isLoading = true
    let url =  `https://localhost:7248/api/Brand/GetBrandWithProducts/${this.selectedBrand}`
    setTimeout(() => {
      this.http.get(url).subscribe({
        next:(response:any) => {console.log(response)
        this.productList = response.productDTOs
      this.isLoading = false;},
        error:(error) => {console.log(error)
        this.isLoading =false},
        complete:() => {
          this.isLoading = false} 
      })
    }, 1000);
    
  }

  ngOnInit(): void {
    let url = "https://localhost:7248/api/Product/GetAllProducts"
    this.http.get(url).subscribe({
      next:(response) => {this.productList = response},
      error:(error) => console.log(error),
      complete:() => console.log("Completed") 
    })

    let categoryListUrl ="https://localhost:7248/api/Category/GetCategoryList";
    let brandListUrl ="https://localhost:7248/api/Brand/GetBrandList";
    this.http.get(categoryListUrl).subscribe((response:any) =>{this.categoryList = response});
    this.http.get(brandListUrl).subscribe((response:any) =>{this.BrandList = response
    console.log(this.BrandList)});
  }
}
