import { Component, OnInit } from '@angular/core';
import { UserAddress } from 'src/app/models/address/getUserAddress.model';
import { UserProfileManagementService } from 'src/app/services/user-profile-management-service/user-profile-management.service';

@Component({
  selector: 'app-address-management',
  templateUrl: './address-management.component.html',
  styleUrls: ['./address-management.component.css']
})
export class AddressManagementComponent implements OnInit{
defaultAddress!:UserAddress
otherAddresses!:UserAddress[]

constructor(private userProfileService:UserProfileManagementService) {
}
  ngOnInit(): void {
    this.getUserDefaultAddress();
    this.getUserAddressesExcludingDefault();
  }
  getUserDefaultAddress(){
    this.userProfileService.getUserDefaultAddress().subscribe({
      next:(response:UserAddress) => {this.defaultAddress = response
      console.log(this.defaultAddress);
      }
    })
  }
  getUserAddressesExcludingDefault(){
  this.userProfileService.getUserAddressesExcludingDefault().subscribe({
    next:(response:UserAddress[]) => this.otherAddresses = response
  })
}
}
