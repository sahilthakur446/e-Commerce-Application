import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addCategory, updateCategory } from 'src/app/models/category/category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryManagerService {
  private getCategoriesWithProductCountsApiUrl = `${environment.apiUrl}api/Category/GetCategoriesWithProductCounts`;
  private addCategoryApiUrl = `${environment.apiUrl}api/Category/AddCategory`;
  private updateCategoryApiUrl = `${environment.apiUrl}api/Category/UpdateCategory/`;
  private deleteCategoryApiUrl = `${environment.apiUrl}api/Category/DeleteCategory/`;

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
