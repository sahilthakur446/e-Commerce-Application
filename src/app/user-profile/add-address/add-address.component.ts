import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AddAddress } from 'src/app/models/address/add-address.model';
import { AddProduct } from 'src/app/models/product/product.model';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { UserProfileManagementService } from 'src/app/services/user-profile-management-service/user-profile-management.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent {
  userId!: string
  fullName: string | undefined;
  mobileNumber: number | undefined
  houseNumber: string | undefined
  area: string | undefined
  landmark: string | undefined
  city: string | undefined
  state: string | undefined
  pinCode: number | undefined
  isDefault?: boolean
  isLoading: boolean = false
  isResponseModalVisible: boolean = false;
  responseMessage: string = '';
  responseClass: string = '';
  responseSuccessClass: string = 'text-3xl font-bold text-green-700';
  responseFailureClass: string = 'text-3xl font-bold text-red-700';
  constructor(private userProfileService: UserProfileManagementService, private router: Router, private authService: AuthService) {
    this.userId = this.authService.retrieveJwtToken('userId')!
  }
  addAddress() {
    let address: AddAddress = {
      fullName: this.fullName!,
      mobileNumber: this.mobileNumber!,
      houseNumber: this.houseNumber!,
      area: this.area!,
      landmark: this.landmark!,
      city: this.city!,
      state: this.state!,
      pincode: this.pinCode!,
      isDefault: this.isDefault
    }

    this.userProfileService.addAddress(address, this.userId).subscribe({
      next: (response: any) => {
        this.responseMessage = response.message
        this.displayResponseModal('success')
      },
      error: (error: any) => {
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
