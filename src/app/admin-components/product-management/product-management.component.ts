import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ProductInfo } from 'src/app/models/product/product.model';
import { GenderApplicability } from 'src/app/models/genderApplicability.enum';
import { ProductManagementService } from 'src/app/services/product-management-service/product-management.service';
import { categoryList } from 'src/app/models/category/category.model';
import { BrandList } from 'src/app/models/brand/brand.model';
import { ProductShowcaseService } from 'src/app/services/product-showcase-service/product-showcase.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {
  products: ProductInfo[] = [];
  categoryList: categoryList[] = [];
  brandList: BrandList[] = [];
  minPrice: number | undefined
  maxPrice: number | undefined
  categoryId: number | undefined | string = ''
  brandId: number | undefined | string = ''
  gender: string | undefined = ''
  productIdToDelete: any;
  selectedCategory: string = "";
  selectedBrand: string = "";
  isLoading: boolean = false;
  showDeleteModal: boolean = false
  responseClass=''
  responseSuccessClass: string = 'text-3xl font-bold text-green-700';
  responseFailureClass: string = 'text-3xl font-bold text-red-700';
  isResponseModalVisible = false; 
  isSuccess = false;
  responseMessage = '';
  constructor(private productShowcaseService: ProductShowcaseService, private productManagementService: ProductManagementService, private router: Router) {
  }

  ngOnInit(): void {
    this.getProducts();
    this.getCategoryList();
    this.getBrandList();
  }

  openDeleteModal() {
    this.showDeleteModal = true;
  }
  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  getCategoryList() {
    this.productManagementService.getCategoryList().subscribe({
      next: (response: categoryList[]) => this.categoryList = response,
      error: (error) => (console.log(error)
      )
    })
  }
  getBrandList() {
    this.productManagementService.getBrandsList().subscribe({
      next: (response: BrandList[]) => this.brandList = response,
      error: (error) => (console.log(error)
      )
    })
  }

  getProducts() {
    this.isLoading = true;
    this.productManagementService.getAllProducts().subscribe({
      next: (product: ProductInfo[]) => {
        console.log(product);
        this.products = product
        this.isLoading =false;
      },
      error: (error) =>{
        console.log(error)
        this.isLoading =false;
      }
    })
  }

  ApplyFilters() {
    this.isLoading = true;
    this.productShowcaseService.minPrice = this.minPrice
    this.productShowcaseService.maxPrice = this.maxPrice
    this.productShowcaseService.categoryId = Number(this.categoryId)
    this.productShowcaseService.brandId = Number(this.brandId)
    this.productShowcaseService.targetGender = this.gender
    this.productShowcaseService.GetProductwithGivenFilter().subscribe({
      next: (response: ProductInfo[]) => {
        this.products = response;
        this.isLoading = false;
  
        if (response.length == 0) {
          this.showResponseModal(false,'No product found')
        }
      },
      error: (error) => this.isLoading = true
    });
  }

  Reset() {
    this.minPrice = undefined;
    this.maxPrice = undefined;
    this.categoryId = '';
    this.brandId = '';
    this.gender = '';

    this.ApplyFilters();
  }


  editProduct(id: any) {
    this.router.navigate(['ProductManager', 'UpdateProduct', id])
  }

  SavingProductId(id: any) {
    this.productIdToDelete = id
  }

  deleteProduct() {
    console.log(this.productIdToDelete);
    this.productManagementService.deleteProduct(this.productIdToDelete)
      .subscribe({
        next: (response) => console.log(response),
        error: (error) => console.log(error),
        complete: () => console.log("completed")
      })
    this.getProducts();
    this.closeDeleteModal()
  }
  showResponseModal(success: boolean, message: string) {
    this.isResponseModalVisible = true;
    this.isSuccess = success;
    this.responseMessage = message;
    setTimeout(() => {
        this.isResponseModalVisible = false;
    }, 3000); 
}
}