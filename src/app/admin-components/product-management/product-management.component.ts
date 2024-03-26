import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Product } from 'src/app/models/product/product.model'; 
import { GenderApplicability } from 'src/app/models/genderApplicability.enum';
import { ProductManagementService } from 'src/app/services/product-management-service/product-management.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit{
  productList:any;
  categoryList:any;
  BrandList:any;
  deletingProductId:any;
  selectedCategory:string ="";
  selectedBrand:string = "";
  isLoading:boolean = false;
  isModelOpen:boolean = false
  constructor(private http: HttpClient,private productMgrService:ProductManagementService,private router:Router) {
  }

  ngOnInit(): void {
    this.getAllProduct();
    this.productMgrService.getCategoryList().subscribe((response:any) =>{this.categoryList = response});
    this.productMgrService.getBrandsList().subscribe((response:any) =>{this.BrandList = response
    console.log(this.BrandList)});
  }

  openModal(){
    this.isModelOpen = true;
  }
  closeModal(){
    this.isModelOpen = false;
  }
  
  applyFilters() {
    this.isLoading = true;
    let url = `https://localhost:7248/api/Brand/GetBrandWithProducts/${this.selectedBrand}`;
    setTimeout(() => {
      this.http.get(url).pipe(
        finalize(() => this.isLoading = false)
      ).subscribe({
        next: (response:any) => {
          console.log(response);
          this.productList = response.productDTOs;
        },
        error: (error) => console.log(error)
      });
    }, 1000);
  }
getAllProduct(){
  this.productMgrService.getAllProducts().subscribe({
    next:(product:Product[]) => {this.productList = product},
    error:(error) => console.log(error),
    complete:() => console.log("Completed") 
  })
  }
  editProduct(id:any)
  {
    this.router.navigate(['ProductManager/UpdateProduct',id])
  }
  SavingProductId(id:any)
  {
    console.log(id);
    
    this.deletingProductId = id
  }
  deleteProduct()
  {
    console.log(this.deletingProductId);
    this.http.delete(`https://localhost:7248/api/Product/DeleteProduct/${this.deletingProductId}`)
    .subscribe({
      next:(response)=> console.log(response),
      error:(error) => console.log(error),
      complete:() => console.log("completed")
    })
    this.getAllProduct();
    this.closeModal()
  }
}
