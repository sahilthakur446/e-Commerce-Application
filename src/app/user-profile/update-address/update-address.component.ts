import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAddress } from 'src/app/models/address/getUserAddress.model';
import { UpdateAddress } from 'src/app/models/address/update_address.model';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { UserProfileManagementService } from 'src/app/services/user-profile-management-service/user-profile-management.service';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.css']
})
export class UpdateAddressComponent implements OnInit{
  fetchedAddress!:UserAddress
  fullName?:string;
  mobileNumber?:number
  houseNumber?:string
  area?:string
  landmark?:string
  city?:string
  state?:string
  pinCode?:number
  isDefault?:boolean
  isLoading:boolean = false
  isResponseModalVisible: boolean = false;
  responseMessage: string = '';
  responseClass: string = '';
  responseSuccessClass: string = 'text-3xl font-bold text-green-700';
  responseFailureClass: string = 'text-3xl font-bold text-red-700';
  constructor(private userProfileService:UserProfileManagementService,private router:Router,private route:ActivatedRoute,private authService:AuthService) {

  }
  ngOnInit(): void {
    let addressId = this.route.snapshot.paramMap.get('addressid')
    this.getAddress(addressId)
  }

  getAddress(addressId:string|null){
    this.userProfileService.getAddress(addressId).subscribe({
      next:(response) => {this.fetchedAddress = response  
      this.area = this.fetchedAddress.area
      this.city = this.fetchedAddress.city
      this.fullName = this.fetchedAddress.fullName
      this.houseNumber = this.fetchedAddress.houseNumber
      this.isDefault = this.fetchedAddress.isDefault
      this.landmark = this.fetchedAddress.landmark
      this.mobileNumber = this.fetchedAddress.mobileNumber
      this.pinCode = this.fetchedAddress.pincode
      this.state = this.fetchedAddress.state
      }
    })
  }

  updateAddress(){
    let address:UpdateAddress ={
      fullName:this.fullName,
      mobileNumber:this.mobileNumber,
      houseNumber:this.houseNumber, 
      area: this.area,
      landmark: this.landmark,
      city:this.city,
      state: this.state,
      pincode: this.pinCode,
      isDefault:this.isDefault
    }
    
    this.userProfileService.updateAddress(address,this.fetchedAddress.userAddressId).subscribe({
      next:(response:any) => {this.responseMessage = response.message
      this.displayResponseModal('success')},
      error:(error:any) => {
        this.responseMessage = error.error.message
        this.displayResponseModal('failure')
      }
    })
  }
  displayResponseModal(result: string) {
    if (result === 'success') {
      this.responseClass = this.responseSuccessClass;
      this.isResponseModalVisible = true;
      this.isLoading = false;
      setTimeout(() => {
        this.isResponseModalVisible = false;
        this.router.navigate(['userdashboard/addresses'])
      }, 2000);
  
    } else {
      this.responseClass = this.responseFailureClass;
      this.isResponseModalVisible = true;
      this.isLoading = false;
      setTimeout(() => {
        this.isResponseModalVisible = false;
      }, 2000);
    }
  }
  
  }
  
