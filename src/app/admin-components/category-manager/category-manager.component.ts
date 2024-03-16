import { Component, OnInit } from '@angular/core';
import { addCategory, categoryWithProductCount, updateCategory } from 'src/app/models/category/category.model';
import { CategoryManagerService } from 'src/app/services/category-service/category-manager.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.css']
})
export class CategoryManagerComponent implements OnInit{
  categoryName:string ='';
  targetGender:string ='';
  categoryList:categoryWithProductCount[] = [];
  selectedCategoryId:number|string = '';
  selectedCategoryName:string = '';
  selectedCategoryTargetGender:string = '';
  showCreateModal:boolean = false;
  showEditModal:boolean = false;
  showDeleteModal :boolean = false;
  isLoading:boolean = false;
  constructor(private categoryManager:CategoryManagerService) {  
  }

  ngOnInit() {
    this.fetchCategoriesWithProductCounts();
  }
  fetchCategoriesWithProductCounts() {
    this.categoryManager.fetchCategoriesWithProductCounts()
      .pipe(
        map(response => response as categoryWithProductCount[])
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.categoryList = response;
        },
        error: (error) => console.log(error),
        complete: () => console.log("completed")
      });
  }

 openModal(input:string)
 {
  if (input === "Edit" ) {
    this.showEditModal = true;
  }
  if (input === "Create" ) {
    this.showCreateModal = true;
  }
  if (input === "Delete" ) {
    this.showDeleteModal = true;
  }
 }
 closeModal(input:string)
 {
  if (input === "Edit" ) {
    this.showEditModal = false;
  }
  if (input === "Create" ) {
    this.showCreateModal = false;
  }
  if (input === "Delete" ) {
    this.showDeleteModal = false;
  }
 }

 selectCategoryForEdit(input:categoryWithProductCount)
 {
  this.selectedCategoryId = input.categoryId
  this.selectedCategoryName = input.categoryName
  this.selectedCategoryTargetGender = input.targetGender
  
 }
 selectCategoryForDeletion(input:categoryWithProductCount)
 {
  this.selectedCategoryId = input.categoryId
 }
 addCategory()
 {
  this.isLoading = true;
  let newCategory:addCategory = {
    categoryName: this.categoryName,
    targetGender: this.targetGender
  }  

    this.categoryManager.addCategory(newCategory).subscribe({
      next:(response) => {console.log(response)
      this.isLoading = false;},
      error:(error) => console.log(error)
    }
    )
 }

 updateCategory(categoryId:string | number)
 {
  this.isLoading =true;

  let updatedCategory:updateCategory = {
    categoryName: this.selectedCategoryName,
    targetGender: this.selectedCategoryTargetGender
  }  

    this.categoryManager.updateCategory(categoryId,updatedCategory).subscribe({
      next:(response) => {console.log(response)
        this.isLoading = false;},
      error:(error) => console.log(error),
      complete:() => console.log('completed')
    }
    )
 }

 deleteCategory(categoryId:string | number)
 {
  this.isLoading =true;
  this.categoryManager.deleteCategory(categoryId).subscribe({
    next:(response) => {console.log(response)
      this.isLoading = false;},
    error:(error) => console.log(error),
    complete:() => console.log('completed')
  })
 }
}
