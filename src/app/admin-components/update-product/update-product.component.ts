import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {
  fetchedProductId : string | null = ''
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
  CategoryList:any;
  BrandList:any;
  previewImage:boolean = false;
  inputTextClass = "p-1 block w-full rounded border border-gray-600"
  validationErrorInputTextClass = "p-1 block w-full rounded border border-gray-600 text-red-500"
  nameValidationError:boolean = false;
  ifImageSelected:boolean = false;
  
  
  constructor(private http:HttpClient, private route: ActivatedRoute) {
  }
  
  ngOnInit(): void {

    let productId = this.route.snapshot.paramMap.get('productid')
    console.log("productId: ",productId);
    
    this.fetchedProductId = productId
    console.log("fetchedId: ",this.fetchedProductId);
    
    let url = `https://localhost:7248/api/Product/GetProduct/${productId}`
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

    let categoryListUrl ="https://localhost:7248/api/Category/GetCategoryList";
    let brandListUrl ="https://localhost:7248/api/Brand/GetBrandList";
    this.http.get(categoryListUrl).subscribe((response:any) =>{this.CategoryList = response});
    this.http.get(brandListUrl).subscribe((response:any) =>{this.BrandList = response});
    
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
    const formData = new FormData();
    if (this.selectedImage) {
      formData.append('Image',this.selectedImage,this.selectedImage.name)
    }
    formData.append('ProductName',this.productName)
    formData.append('ProductDescription',this.productDescription)
    formData.append('targetGender',this.targetGender)
    formData.append('price',this.price)
    formData.append('stockQuantity',this.stockQuantity)
    formData.append('categoryId',this.category)
    formData.append('brandId',this.brand)
    
    let url: string = `https://localhost:7248/api/Product/UpdateProduct/${this.fetchedProductId}`;
    this.http.put(url, formData).subscribe({
    next: (response) => console.log(response),
    error: (error) => console.log(error)
    });
  
  }
  
  }
  
