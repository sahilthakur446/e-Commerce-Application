import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addCategory, updateCategory } from 'src/app/models/category/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryManagerService {
  private getCategoriesWithProductCountsApiUrl = 'https://localhost:7248/api/Category/GetCategoriesWithProductCounts';
  private addCategoryApiUrl = 'https://localhost:7248/api/Category/AddCategory';
  private updateCategoryApiUrl = 'https://localhost:7248/api/Category/UpdateCategory/';
  private deleteCategoryApiUrl = 'https://localhost:7248/api/Category/DeleteCategory/';

  constructor(private httpClient: HttpClient) { }

  fetchCategoriesWithProductCounts(){
    return this.httpClient.get(this.getCategoriesWithProductCountsApiUrl);
  }

  addCategory(category:addCategory) {
    return this.httpClient.post(this.addCategoryApiUrl, category);
  }

  updateCategory(categoryId: string |number, updatedCategory:updateCategory) {
    const updateCategoryUrl = `${this.updateCategoryApiUrl}${categoryId}`;
    return this.httpClient.put(updateCategoryUrl, updatedCategory);
  }

  deleteCategory(categoryId: string | number) {
    const deleteCategoryUrl = `${this.deleteCategoryApiUrl}${categoryId}`;
    return this.httpClient.delete(deleteCategoryUrl);
  }
}
