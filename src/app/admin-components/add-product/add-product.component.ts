import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { Product } from 'src/app/models/product/product.model';
import { ProductManagementService } from 'src/app/services/product-management-service/product-management.service';

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
categoryList:any;
brandList:any;
previewImage:boolean = false;
inputTextClass = "p-1 block w-full rounded border border-gray-600"
validationErrorInputTextClass = "p-1 block w-full rounded border border-gray-600 text-red-500"
nameValidationError:boolean = false;
ifImageSelected:boolean = false;


constructor(private http:HttpClient,private productMgrService:ProductManagementService,) {
}

ngOnInit(): void {
  this.productMgrService.getCategoryList().subscribe({
    next:(response:any) => this.categoryList = response,
  });
  this.productMgrService.getBrandsList().subscribe({
    next:(response:any) => this.brandList = response,
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
  this.http.post<Product>(url, formData).subscribe({
  next: (response) => console.log(response),
  error: (error) => console.log(error)
  });

}

}
