import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import {FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
selectedImage:File | undefined;
selectedImageUrl:any;
productName = ''
productDescription = ''
targetGender = ''
price = ''
stockQuantity = ''
category = ''
brand = ''
CategoryList:any;
BrandList:any;
previewImage:boolean = false;

ngOnInit(): void {
  let categoryListUrl ="https://localhost:7248/api/Category/GetCategoryList";
  let brandListUrl ="https://localhost:7248/api/Brand/GetBrandList";
  this.http.get(categoryListUrl).subscribe((response:any) =>{this.CategoryList = response
    console.log(this.CategoryList)});
  
  
  this.http.get(brandListUrl).subscribe((response:any) =>{this.BrandList = response
    console.log(this.BrandList)});
  
  
}

constructor(private http:HttpClient) {
  
}


onFileChange(event: any) {

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

  let url: string = "https://localhost:7248/api/Product/AddProduct";
  this.http.post(url, formData).subscribe({
  next: (response) => console.log(response),
  error: (error) => console.log(error)
  });

}

}
