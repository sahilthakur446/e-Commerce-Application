import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { changePassword } from 'src/app/models/user/change-password.model';
import { updateUser } from 'src/app/models/user/update-user.model';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { UserProfileManagementService } from 'src/app/services/user-profile-management-service/user-profile-management.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userId: string = '';
  firstName: string | undefined;
  lastName: string | undefined;
  fullName: string | undefined;
  email: string | undefined;
  gender: string = ''
  oldPassword: string | undefined;
  newPassword: string | undefined;
  modalInputFieldName: string | undefined;
  isModalOpen: boolean = false;
  type: string = '';
  isLoading: boolean = false;
  showDeleteModal:boolean = false;
  loadingStatus: string = 'Updating...'
  isResponseModalVisible: boolean = false;
  responseMessage: string = '';
  responseClass: string = '';
  responseSuccessClass: string = 'text-3xl font-bold text-green-700';
  responseFailureClass: string = 'text-3xl font-bold text-red-700';
  constructor(private userProfileManagement: UserProfileManagementService, private authService: AuthService, private router:Router) {
  }
  ngOnInit(): void {
    this.getUserInfo();
  }
  update(type: string) {
    if (type == 'Name' || type == 'Email' || type == 'Gender') {
      this.updateData(type)
    }
    else {
      this.changePassword()
    }
  }
  getUserInfo() {
    let userId: string = this.authService.retrieveJwtToken('userId')!
    this.userId = userId
    this.userProfileManagement.getUserInfo(userId).subscribe({
      next: (userInfo: any) => {
        this.firstName = userInfo.firstName;
        this.lastName = userInfo.lastName;
        this.fullName = `${userInfo.firstName} ${userInfo.lastName}`;
        this.gender = userInfo.gender;
        this.email = userInfo.email;
      },
      error: (error) => console.log(error)

    })
  }
  updateData(input: string) {
    this.isLoading = true;
    let x: updateUser;
    if (input == 'Name') {
      x = {
        firstName: this.firstName,
        lastName: this.lastName
      }
    }
    if (input == 'Email') {
      x = {
        email: this.email
      }
    }
    if (input == 'Gender') {
      x = {
        gender: this.gender
      }
    }

    this.userProfileManagement.updateUser(this.userId, x!).subscribe({
      next: (response:any) => {
        this.responseMessage = response.message
        this.getUserInfo()
        this.displayResponseModal('success')
      },
      error:(response:any) =>{
        console.log(response);
        
        this.responseMessage = response.error.message
        this.getUserInfo()
        this.displayResponseModal('failure')
      }

    })
  }
  changePassword() {
    console.log('old: ', this.oldPassword);
    console.log('new: ', this.newPassword);

    let x: changePassword = {
      oldPassword: this.oldPassword!,
      newPassword: this.newPassword!
    }
    this.userProfileManagement.changePassword(this.userId, x!)
      .subscribe({
        next: (response:any) => {
          this.responseMessage = response.message
          this.displayResponseModal('success')
        },
        error:(response:any) =>{
          this.responseMessage = response.error.message
          this.displayResponseModal('failure')
        }
      })
  }
  
  deleteAccount(){
    this.userProfileManagement.deleteAccount(this.userId)
    .subscribe({
      next: (response:any) => {
        this.responseMessage = response.message
        this.displayDeleteResponseModal('success')
      },
      error:(response:any) =>{
        response.error.message? this.responseMessage = response.error.message: this.responseMessage = "Failed Due to Internal Server Issue"
        this.displayDeleteResponseModal('failure')
      }
    })
  }

  openModal(type: string) {
    this.type = type
    console.log(type);

    switch (type) {
      case 'Name':
        this.modalInputFieldName = type
        break;
      case 'Email':
        this.modalInputFieldName = type
        break;
      case 'Gender':
        this.modalInputFieldName = type
        break;
      case 'Password':
        this.modalInputFieldName = type
        break;
      default:
        break;
    }
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }
  openDeleteModal(){
    this.showDeleteModal = true;
  }
  closeDeleteModal(){
    this.showDeleteModal = false
  }
  displayResponseModal(result: string) {
    if (result === 'success') {
      this.responseClass = this.responseSuccessClass;
      this.isResponseModalVisible = true;
      this.isLoading = false;
      this.closeModal();
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

  displayDeleteResponseModal(result: string) {
    if (result === 'success') {
      this.responseClass = this.responseSuccessClass;
      this.isResponseModalVisible = true;
      this.isLoading = false;
      this.closeDeleteModal();
      setTimeout(() => {
        this.isResponseModalVisible = false;
        this.router.navigate(['Login']);
      }, 2000);

    } else {
      this.responseClass = this.responseFailureClass;
      this.isResponseModalVisible = true;
      this.isLoading = false;
      this.closeDeleteModal();
      setTimeout(() => {
        this.isResponseModalVisible = false;
      }, 2000);
    }
  }
}