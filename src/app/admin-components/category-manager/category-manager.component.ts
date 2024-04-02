import { Component, OnInit } from '@angular/core';
import { addCategory, categoryWithProductCount, updateCategory } from 'src/app/models/category/category.model';
import { CategoryManagerService } from 'src/app/services/category-service/category-manager.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.css']
})
export class CategoryManagerComponent implements OnInit {
  categoryName: string = '';
  targetGender: string = '';
  categoryList: categoryWithProductCount[] = [];
  selectedCategoryId: number | string = '';
  selectedCategoryName: string = '';
  selectedCategoryTargetGender: string = '';
  showCreateModal: boolean = false;
  showEditModal: boolean = false;
  showDeleteModal: boolean = false;
  isLoading: boolean = false;
  loadingStatus: string = '';
  isModalVisible: boolean = false;
  responseMessage: string = '';
  responseClass: string = '';
  responseSuccessClass: string = 'text-3xl font-bold text-green-700';
  responseFailureClass: string = 'text-3xl font-bold text-red-700';

  constructor(private categoryManager: CategoryManagerService) { }

  ngOnInit() {
    this.fetchCategoriesWithProductCounts();
  }

  fetchCategoriesWithProductCounts() {
    this.isLoading = true;
    this.categoryManager.fetchCategoriesWithProductCounts()
      .pipe(
        map(response => response as categoryWithProductCount[])
      )
      .subscribe({
        next: (response) => {
          this.categoryList = response;
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
        },
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

  selectCategoryForEdit(input: categoryWithProductCount) {
    this.selectedCategoryId = input.categoryId;
    this.selectedCategoryName = input.categoryName;
    this.selectedCategoryTargetGender = input.targetGender;
  }

  selectCategoryForDeletion(input: categoryWithProductCount) {
    this.selectedCategoryId = input.categoryId;
  }

  addCategory() {
    this.isLoading = true;
    this.loadingStatus = 'Creating...';
    let newCategory: addCategory = {
      categoryName: this.categoryName,
      targetGender: this.targetGender
    }

    this.categoryManager.addCategory(newCategory).subscribe({
      next: (response) => {
        console.log(response);
        this.isLoading = false;
        this.fetchCategoriesWithProductCounts();
        this.closeModal('Create');
        this.responseMessage = 'Created successfully';
        this.responseClass = this.responseSuccessClass;
        this.isModalVisible = true;
        setTimeout(() => {
          this.isModalVisible = false;
        }, 3000);
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
        this.closeModal('Create');
        this.fetchCategoriesWithProductCounts();
        this.responseClass = this.responseFailureClass;
        this.responseMessage = 'Failed to Create';
        this.isModalVisible = true;
        setTimeout(() => {
          this.isModalVisible = false;
        }, 3000);
      }
    })
  }

  updateCategory(categoryId: string | number) {
    this.isLoading = true;
    this.loadingStatus = 'Updating..';
    let updatedCategory: updateCategory = {
      categoryName: this.selectedCategoryName,
      targetGender: this.selectedCategoryTargetGender
    }

    this.categoryManager.updateCategory(categoryId, updatedCategory).subscribe({
      next: (response) => {
        console.log(response);
        this.isLoading = false;

        this.fetchCategoriesWithProductCounts();
        this.closeModal('Edit');

        this.responseMessage = 'Updated successfully';
        this.responseClass = this.responseSuccessClass;
        this.isModalVisible = true;
        setTimeout(() => {
          this.isModalVisible = false;
        }, 3000);
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
        this.closeModal('Edit');
        this.fetchCategoriesWithProductCounts();
        this.responseClass = this.responseFailureClass;
        this.responseMessage = 'Failed to Update';
        this.isModalVisible = true;
        setTimeout(() => {
          this.isModalVisible = false;
        }, 3000);
      }
    })
  }

  deleteCategory(categoryId: string | number) {
    this.isLoading = true;
    this.loadingStatus = 'Deleting...';
    this.categoryManager.deleteCategory(categoryId).subscribe({
      next: (response) => {
        console.log(response);
        this.isLoading = false;
        this.closeModal('Delete');
        this.fetchCategoriesWithProductCounts();
        this.responseClass = this.responseSuccessClass;
        this.responseMessage = 'Deleted successfully';
        this.isModalVisible = true;
        setTimeout(() => {
          this.isModalVisible = false;
        }, 3000);
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
        this.closeModal('Delete');
        this.fetchCategoriesWithProductCounts();
        this.responseClass = this.responseFailureClass;
        this.responseMessage = 'Failed to Delete';
        this.isModalVisible = true;
        setTimeout(() => {
          this.isModalVisible = false;
        }, 3000);
      }
    })
  }
}
