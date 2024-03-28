import { Component } from '@angular/core';
import { AddAddress } from 'src/app/models/address/add-address.model';
import { AddProduct } from 'src/app/models/product/product.model';
import { UserProfileManagementService } from 'src/app/services/user-profile-management-service/user-profile-management.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent {
fullName:string|undefined;
mobileNumber:number|undefined 
houseNumber:string|undefined 
area:string|undefined 
landmark:string|undefined 
city:string|undefined
state:string|undefined 
pinCode:number|undefined 
isDefault?:boolean
constructor(private userProfileService:UserProfileManagementService) {
}
addAddress(){
  let address:AddAddress ={
    fullName:this.fullName!,
    mobileNumber:this.mobileNumber!,
    houseNumber:this.houseNumber!, 
    area: this.area!,
    landmark: this.landmark!,
    city:this.city!,
    state: this.state!,
    pincode: this.pinCode!,
    isDefault:this.isDefault
  }
  console.log(address);
  
  this.userProfileService.addAddress(address).subscribe({
    next:(response) => console.log(response),
    error:(error) => console.log(error)
  })
}


}
