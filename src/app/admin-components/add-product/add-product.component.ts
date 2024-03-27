import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { router } from 'ngx-bootstrap-icons';
import { ProductManagementService } from 'src/app/services/product-management-service/product-management.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  selectedImage: File | undefined;
  selectedImageUrl: any;
  productName = ''
  productDescription = ''
  targetGender = ''
  price = ''
  stockQuantity = ''
  category = ''
  brand = ''
  categoryList: any;
  brandList: any;
  previewImage: boolean = false;
  inputTextClass = "p-1 block w-full rounded border border-gray-600"
  validationErrorInputTextClass = "p-1 block w-full rounded border border-gray-600 text-red-500"
  nameValidationError: boolean = false;
  ifImageSelected: boolean = false;
  isLoading: boolean = false;
  showResponseModal: boolean = false;
  responseMessage: string = '';
  responseClass: string = '';
  responseSuccessClass: string = 'text-3xl font-bold text-green-700';
  responseFailureClass: string = 'text-3xl font-bold text-red-700';
  submitButtonText: string = "Submit"
  constructor(private productManagementService: ProductManagementService, private router: Router) {
  }

  ngOnInit(): void {
    this.productManagementService.getCategoryList().subscribe({
      next: (response: any) => this.categoryList = response,
    });
    this.productManagementService.getBrandsList().subscribe({
      next: (response: any) => this.brandList = response,
    });

  }

  onFileChange(event: any) {
    if (event.target.files.length == 0) {
      this.selectedImageUrl = ""
    }

    if (event.target.files && event.target.files.length > 0) {
      this.selectedImage = event.target.files[0];
      this.previewImage = true;
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.selectedImageUrl = event.target.result;
        this.previewImage = false;
      };
      if (this.selectedImage) {
        reader.readAsDataURL(this.selectedImage);
        this.ifImageSelected = true;
      }
    }
  }

  onSubmit(): void {
    this.isLoading = true;
    this.submitButtonText = 'Creating...';

    const productData = new FormData();
    if (this.selectedImage) {
      productData.append('Image', this.selectedImage, this.selectedImage.name);
    }

    productData.append('ProductName', this.productName);
    productData.append('ProductDescription', this.productDescription);
    productData.append('targetGender', this.targetGender);
    productData.append('price', this.price);
    productData.append('stockQuantity', this.stockQuantity);
    productData.append('categoryId', this.category);
    productData.append('brandId', this.brand);

    this.productManagementService.addProduct(productData).subscribe({
      next: (response: any) => {
        this.handleSuccessfulProductCreation(response.message);
      },
      error: (error) => {
        this.handleProductCreationError(error);
      }
    });
  }

  handleSuccessfulProductCreation(message: string) {
    this.responseMessage = message;
    this.responseClass = this.responseSuccessClass;
    this.submitButtonText = 'Submit';
    this.isLoading = false;
    this.showResponseModal = true;

    setTimeout(() => {
      this.showResponseModal = false;
      this.router.navigate(['/ProductManager'])
    }, 3000);
  }

  handleProductCreationError(error: any) {
    this.responseMessage = error.error.message || "Failed to create Product Due to Internal Server Issue";
    if (this.selectedImage == null) {
      this.responseMessage = "Please Select Image"
    }
    this.responseClass = this.responseFailureClass;
    this.submitButtonText = 'Submit';
    this.isLoading = false;
    this.showResponseModal = true;

    setTimeout(() => {
      this.showResponseModal = false;
    }, 3000);
  }
}