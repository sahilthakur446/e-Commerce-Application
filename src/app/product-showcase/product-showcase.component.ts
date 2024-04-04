import { Component, OnInit } from '@angular/core';
import { ProductManagementService } from '../services/product-management-service/product-management.service';
import { ProductInfo } from '../models/product/product.model';
import { categoryList } from '../models/category/category.model';
import { BrandList } from '../models/brand/brand.model';
import { ProductShowcaseService } from '../services/product-showcase-service/product-showcase.service';
import { StorageService } from '../services/storage-service/storage.service';
import { AddWishlist } from '../models/wishlist/add-wishlist.model';
import { UserProfileManagementService } from '../services/user-profile-management-service/user-profile-management.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-showcase',
  templateUrl: './product-showcase.component.html',
  styleUrls: ['./product-showcase.component.css']
})
export class ProductShowcaseComponent implements OnInit {
  userId!: string
  productList: ProductInfo[] = [];
  categoryList: categoryList[] = [];
  brandList: BrandList[] = []
  minPrice: number | undefined
  maxPrice: number | undefined
  categoryName: string | undefined
  categoryId: number | undefined | string = ''
  brandId: number | undefined | string = ''
  gender: string | undefined = ''
  newArrival: boolean | undefined
  isLoading: boolean = false;
  showDeleteModal: boolean = false
  responseClass = ''
  responseSuccessClass: string = 'text-3xl font-bold text-green-700';
  responseFailureClass: string = 'text-3xl font-bold text-red-700';
  isResponseModalVisible = false;
  isSuccess = false;
  responseMessage = '';
  constructor(private productMngmntservice: ProductManagementService,
    private productShowcaseService: ProductShowcaseService,
    private storageService: StorageService,
    private userProfileService: UserProfileManagementService,
    private route: ActivatedRoute) {
  }
  ngOnInit(): void {

    if (this.route.snapshot.paramMap.get('category')) {
      this.categoryName = this.route.snapshot.paramMap.get('category')!
      this.applyFilters();
      this.getUserId()
      this.getCategoryList()
      this.getBrandList()
      return;
    }

    if (this.route.snapshot.paramMap.get('segment') === 'newarrival') {
      this.newArrival = true
      this.applyFilters();
      this.getUserId()
      this.getCategoryList()
      this.getBrandList()
      return;
    }
    this.getUserId()
    this.getCategoryList()
    this.getBrandList()
    this.getAllProducts()

  }

  getUserId() {
    this.userId = this.storageService.getItem('userId')!
  }

  getAllProducts() {
    this.productMngmntservice.getAllProducts().subscribe({
      next: (response: ProductInfo[]) => {
        this.productList = response
        setTimeout(() => { this.isLoading = false }, 1000)
      },
      error: (error) => console.log(error)
    })
  }

  getCategoryList() {
    this.productMngmntservice.getCategoryList().subscribe({
      next: (response: categoryList[]) => this.categoryList = response,
      error: (error) => (console.log(error)
      )
    })
  }

  getBrandList() {
    this.productMngmntservice.getBrandsList().subscribe({
      next: (response: BrandList[]) => this.brandList = response,
      error: (error) => (console.log(error)
      )
    })
  }

  applyFilters() {
    this.isLoading = true
    this.productShowcaseService.minPrice = this.minPrice
    this.productShowcaseService.maxPrice = this.maxPrice
    this.productShowcaseService.categoryName = this.categoryName
    this.productShowcaseService.categoryId = Number(this.categoryId)
    this.productShowcaseService.brandId = Number(this.brandId)
    this.productShowcaseService.targetGender = this.gender
    this.productShowcaseService.newArrival = this.newArrival
    this.productShowcaseService.GetProductwithGivenFilter().subscribe({
      next: (response: ProductInfo[]) => {
        this.productList = response
        this.isLoading = false
        if (response.length == 0) {
          this.showResponseModal(false, 'No product found')
        }
      },
      error: (error) => console.log(error)
    })
  }

  reset() {
    this.minPrice = undefined;
    this.maxPrice = undefined;
    this.categoryId = '';
    this.brandId = '';
    this.gender = '';

    this.applyFilters();
  }

  addToWishlist(productId: number) {

    let wishlistItem: AddWishlist = {
      productId: Number(productId),
      userId: Number(this.userId)
    }
    this.userProfileService.addWishlistItem(this.userId, wishlistItem).subscribe({
      next: (response) => {
        console.log(response);
        this.showResponseModal(true, 'Added to wishlist')
      },
      error: (error) => this.showResponseModal(false, error.error)
    })
  }


  showResponseModal(success: boolean, message: string) {
    this.isResponseModalVisible = true;
    this.isSuccess = success;
    this.responseMessage = message;
    setTimeout(() => {
      this.isResponseModalVisible = false;
    }, 3000);
  }
}
