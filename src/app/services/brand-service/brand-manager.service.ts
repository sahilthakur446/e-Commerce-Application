import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createUpdateBrand } from 'src/app/models/brand/brand.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BrandManagerService {
  private getBrandsWithProductCountsApiUrl = `${environment.apiUrl}api/Brand/GetBrandsWithProductCounts`;
  private addBrandApiUrl = `${environment.apiUrl}api/Brand/AddBrand`;
  private updateBrandApiUrl = `${environment.apiUrl}api/Brand/UpdateBrand/`;
  private deleteBrandApiUrl = `${environment.apiUrl}api/Brand/DeleteBrand/`;

  constructor(private httpClient: HttpClient) { }

  fetchCategoriesWithProductCounts(){
    return this.httpClient.get(this.getBrandsWithProductCountsApiUrl);
  }

  addBrand(brand:createUpdateBrand) {
    return this.httpClient.post(this.addBrandApiUrl, brand);
  }

  updateBrand(brandId: string |number, updatedBrand:createUpdateBrand) {
    const updateBrandUrl = `${this.updateBrandApiUrl}${brandId}`;
    return this.httpClient.put(updateBrandUrl, updatedBrand);
  }

  deleteBrand(BrandId: string | number) {
    const deleteBrandUrl = `${this.deleteBrandApiUrl}${BrandId}`;
    return this.httpClient.delete(deleteBrandUrl);
  }
}

