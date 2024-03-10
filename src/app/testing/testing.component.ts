import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent {
Name:string = ""
selectedImage: File | undefined
formData:FormData = new FormData()

onFileChange(event:any){
  this.selectedImage = event.target.files[0]
}

constructor(private http: HttpClient) {
  
}
onSubmit(){
  this.formData.append('name',this.Name)
  if (this.selectedImage) {
    this.formData.append('image',this.selectedImage,this.selectedImage.name)
  }
  let url: string = "https://localhost:7248/api/Product/AddProductt";
  this.http.post(url, this.formData).subscribe(
    (response) => console.log(response),
    (error) => console.log(error)
  );
}
}
