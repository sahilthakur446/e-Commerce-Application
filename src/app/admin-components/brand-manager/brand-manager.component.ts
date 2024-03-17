import { Component } from '@angular/core';
import { map } from 'rxjs';
import { brandWithProductCount, createUpdateBrand } from 'src/app/models/brand/brand.model';
import { BrandManagerService } from 'src/app/services/brand-service/brand-manager.service';

@Component({
  selector: 'app-brand-manager',
  templateUrl: './brand-manager.component.html',
  styleUrls: ['./brand-manager.component.css']
})
export class BrandManagerComponent {
  brandName: string = '';
  targetGender: string = '';
  brandList: brandWithProductCount[] = [];
  selectedBrandId: number | string = '';
  selectedBrandName: string = '';
  selectedBrandTargetGender: string = '';
  showCreateModal: boolean = false;
  showEditModal: boolean = false;
  showDeleteModal: boolean = false;
  isLoading: boolean = false;
  loadingStatus: string = '';
  deletedSuccessfully: boolean = false;
  updatedSuccessfully: boolean = false;
  createdSuccessfully: boolean = false;
  responseMessage: string = '';
  responseClass: string = '';
  responseSuccessClass: string = 'text-3xl font-bold text-green-700';
  responseFailureClass: string = 'text-3xl font-bold text-red-700';

  constructor(private brandManager: BrandManagerService) { }

  ngOnInit() {
    this.fetchCategoriesWithProductCounts();
  }

  fetchCategoriesWithProductCounts() {
    this.brandManager.fetchCategoriesWithProductCounts()
      .pipe(
        map(response => response as brandWithProductCount[])
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.brandList = response;
        },
        error: (error) => console.log(error),
        complete: () => console.log("completed")
      });
  }

  openModal(input: string) {
    if (input === "Edit") {
      this.showEditModal = true;
    }
    if (input === "Create") {
      this.showCreateModal = true;
    }
    if (input === "Delete") {
      this.showDeleteModal = true;
    }
  }

  closeModal(input: string) {
    if (this.isLoading) {
      return;
    }
    if (input === "Edit") {
      this.showEditModal = false;
    }
    if (input === "Create") {
      this.showCreateModal = false;
    }
    if (input === "Delete") {
      this.showDeleteModal = false;
    }
  }

  selectBrandForEdit(input: brandWithProductCount) {
    this.selectedBrandId = input.brandId;
    this.selectedBrandName = input.brandName;
  }

  selectBrandForDeletion(input: brandWithProductCount) {
    this.selectedBrandId = input.brandId;
  }

  addBrand() {
    this.isLoading = true;
    this.loadingStatus = 'Creating...';
    let newBrand: createUpdateBrand = {
      brandName: this.brandName,
    }

    this.brandManager.addBrand(newBrand).subscribe({
      next: (response) => {
        console.log(response);
        this.isLoading = false;
        this.fetchCategoriesWithProductCounts();
        this.closeModal('Create');
        this.responseMessage = 'Created successfully';
        this.responseClass = this.responseSuccessClass;
        this.deletedSuccessfully = true;
        setTimeout(() => {
          this.deletedSuccessfully = false;
        }, 3000);
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
        this.closeModal('Create');
        this.fetchCategoriesWithProductCounts();
        this.responseClass = this.responseFailureClass;
        this.responseMessage = 'Failed to Create';
        this.deletedSuccessfully = true;
        setTimeout(() => {
          this.deletedSuccessfully = false;
        }, 3000);
      }
    })
  }

  updateBrand(brandId: string | number) {
    this.isLoading = true;
    this.loadingStatus = 'Updating..';
    let updatedBrand: createUpdateBrand = {
      brandName: this.selectedBrandName,
    }

    this.brandManager.updateBrand(brandId, updatedBrand).subscribe({
      next: (response) => {
        console.log(response);
        this.isLoading = false;

        this.fetchCategoriesWithProductCounts();
        this.closeModal('Edit');

        this.responseMessage = 'Updated successfully';
        this.responseClass = this.responseSuccessClass;
        this.deletedSuccessfully = true;
        setTimeout(() => {
          this.deletedSuccessfully = false;
        }, 3000);
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
        this.closeModal('Edit');
        this.fetchCategoriesWithProductCounts();
        this.responseClass = this.responseFailureClass;
        this.responseMessage = 'Failed to Update';
        this.deletedSuccessfully = true;
        setTimeout(() => {
          this.deletedSuccessfully = false;
        }, 3000);
      }
    })
  }

  deleteBrand(brandId: string | number) {
    this.isLoading = true;
    this.loadingStatus = 'Deleting...';
    this.brandManager.deleteBrand(brandId).subscribe({
      next: (response) => {
        console.log(response);
        this.isLoading = false;
        this.closeModal('Delete');
        this.fetchCategoriesWithProductCounts();
        this.responseClass = this.responseSuccessClass;
        this.responseMessage = 'Deleted successfully';
        this.deletedSuccessfully = true;
        setTimeout(() => {
          this.deletedSuccessfully = false;
        }, 3000);
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
        this.closeModal('Delete');
        this.fetchCategoriesWithProductCounts();
        this.responseClass = this.responseFailureClass;
        this.responseMessage = 'Failed to Delete';
        this.deletedSuccessfully = true;
        setTimeout(() => {
          this.deletedSuccessfully = false;
        }, 3000);
      }
    })
  }
}

