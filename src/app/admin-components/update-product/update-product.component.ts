import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateProduct } from 'src/app/models/product/product.model';
import { ProductManagementService } from 'src/app/services/product-management-service/product-management.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {
  fetchedProductId : string | null= ''
  selectedImage:File | undefined;
  selectedImageUrl:any;
  productName = ''
  productDescription = ''
  targetGender = ''
  price = ''
  stockQuantity = ''
  category = ''
  brand = ''
  imagePath = ''
  categoryList:any;
  brandList:any;
  previewImage:boolean = false;
  inputTextClass = "p-1 block w-full rounded border border-gray-600"
  validationErrorInputTextClass = "p-1 block w-full rounded border border-gray-600 text-red-500"
  nameValidationError:boolean = false;
  ifImageSelected:boolean = false;
  isLoading: boolean = false;
  showResponseModal: boolean = false;
  responseMessage: string = '';
  responseClass: string = '';
  responseSuccessClass: string = 'text-3xl font-bold text-green-700';
  responseFailureClass: string = 'text-3xl font-bold text-red-700';
  submitButtonText: string = "Submit"
  
  constructor(private http:HttpClient,private productManagementService:ProductManagementService, private route: ActivatedRoute, private router:Router) {
  }
  
  ngOnInit(): void {

    let productId = this.route.snapshot.paramMap.get('productid')
    console.log("productId: ",productId);
    
    this.fetchedProductId = productId
    console.log("fetchedId: ",this.fetchedProductId);
    
    let url = `${environment.apiUrl}api/Product/GetProduct/${productId}`
    this.http.get(url).subscribe({
      next:(response:any)=>{console.log(response)
        this.brand = response.brandId;
        this.productName = response.productName;
        this.productDescription = response.productDescription;
        this.stockQuantity = response.stockQuantity;
        this.price = response.price;
        this.imagePath = `https://localhost:7248/${response.imagePath}`;
        this.category = response.categoryId
      },
      error:(error) => (console.log(error)),
      complete:() => (console.log("completed")
      )
    })

    this.productManagementService.getCategoryList().subscribe({
      next: (response: any) => this.categoryList = response,
    });
    this.productManagementService.getBrandsList().subscribe({
      next: (response: any) => this.brandList = response,
    });
    
  }
  
  onFileChange(event: any) {
  if(event.target.files.length == 0)
  {
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
    const updatedProduct = new FormData();
    if (this.selectedImage) {
      updatedProduct.append('Image',this.selectedImage,this.selectedImage.name)
    }
    updatedProduct.append('ProductName',this.productName)
    updatedProduct.append('ProductDescription',this.productDescription)
    updatedProduct.append('targetGender',this.targetGender)
    updatedProduct.append('price',this.price)
    updatedProduct.append('stockQuantity',this.stockQuantity)
    updatedProduct.append('categoryId',this.category)
    updatedProduct.append('brandId',this.brand)
    
    this.productManagementService.updateProduct(updatedProduct,this.fetchedProductId).subscribe({
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
    this.responseClass = this.responseFailureClass;
    this.submitButtonText = 'Submit';
    this.isLoading = false;
    this.showResponseModal = true;

    setTimeout(() => {
      this.showResponseModal = false;
    }, 3000);
  }
}
  
