import { Component, OnInit } from '@angular/core';
import { UserAddress } from 'src/app/models/address/getUserAddress.model';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { UserProfileManagementService } from 'src/app/services/user-profile-management-service/user-profile-management.service';

@Component({
  selector: 'app-address-management',
  templateUrl: './address-management.component.html',
  styleUrls: ['./address-management.component.css']
})
export class AddressManagementComponent implements OnInit {
  userId!:string
  selectedAddressId!: number
  defaultAddress!: UserAddress
  otherAddresses!: UserAddress[]
  isLoading: boolean = false
  showDeleteModal: boolean = false;
  isResponseModalVisible: boolean = false;
  responseMessage: string = '';
  responseClass: string = '';
  responseSuccessClass: string = 'text-3xl font-bold text-green-700';
  responseFailureClass: string = 'text-3xl font-bold text-red-700';
  constructor(private userProfileService: UserProfileManagementService) {
    this.userId = localStorage.getItem('userId')!
    console.log(this.userId);
  }
  ngOnInit(): void {
    this.getUserDefaultAddress();
    this.getUserAddressesExcludingDefault();
  }
  getUserDefaultAddress() {
    console.log('hey',this.userId);
    
    this.userProfileService.getUserDefaultAddress(this.userId).subscribe({
      next: (response: UserAddress) =>  this.defaultAddress = response
    })
  }
  getUserAddressesExcludingDefault() {
    this.userProfileService.getUserAddressesExcludingDefault(this.userId).subscribe({
      next: (response: UserAddress[]) => this.otherAddresses = response
    })
  }

  deleteAddress(addressId:number){
  this.isLoading =true;
  this.userProfileService.deleteAddress(addressId).subscribe({
    next:(response:any) => {this.responseMessage = response.message
      console.log(response.message);
      
    this.displayResponseModal('success')}
  })
  }
  saveAddressId(addressId: number) {
    this.selectedAddressId = addressId
  }
  toggleDeleteModal() {
    this.showDeleteModal = !this.showDeleteModal;
  }

  displayResponseModal(result: string) {
    if (result === 'success') {
      this.responseClass = this.responseSuccessClass;
      this.isResponseModalVisible = true;
      this.isLoading = false;
      this.toggleDeleteModal();
      this.getUserAddressesExcludingDefault()
      this.getUserAddressesExcludingDefault()
      setTimeout(() => {
        this.isResponseModalVisible = false;
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
