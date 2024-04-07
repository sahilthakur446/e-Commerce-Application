import { Component, OnInit } from '@angular/core';
import { ProductManagementService } from '../services/product-management-service/product-management.service';
import { ProductInfo, ProductsForPagination } from '../models/product/product.model';
import { categoryList } from '../models/category/category.model';
import { BrandList } from '../models/brand/brand.model';
import { ProductShowcaseService } from '../services/product-showcase-service/product-showcase.service';
import { StorageService } from '../services/storage-service/storage.service';
import { AddWishlist } from '../models/wishlist/add-wishlist.model';
import { UserProfileManagementService } from '../services/user-profile-management-service/user-profile-management.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-showcase',
  templateUrl: './product-showcase.component.html',
  styleUrls: ['./product-showcase.component.css']
})
export class ProductShowcaseComponent implements OnInit {
  userId!: string
  currentPage: number = 1
  currentPageForFilter: number = 1
  totalPages!: number
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
  isfilterApplied: boolean = false;
  environment = `${environment.apiUrl}`
  routeParamSubscription!: Subscription;

  constructor(private productMngmntservice: ProductManagementService,
    private productShowcaseService: ProductShowcaseService,
    private storageService: StorageService,
    private userProfileService: UserProfileManagementService,
    private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.routeParamSubscription = this.route.paramMap.subscribe(params => {
      let segment = params.get('segment')
      this.reset()
      switch (segment) {
        case 'newarrival':
          this.newArrival = true
          this.applyFilters();
          break;
        case 'men':
          this.gender = 'Male'
          this.applyFilters();
          break;
        case 'women':
          this.gender = 'Female'
          this.applyFilters();
          break;
        default:
          break;
      }
    })

    this.getUserId()
    this.getCategoryList()
    this.getBrandList()
    this.getProducts()

  }

  ngOnDestroy() {
    if (this.routeParamSubscription) {
      this.routeParamSubscription.unsubscribe();
    }
  }

  getUserId() {
    this.userId = this.storageService.getItem('userId')!
  }

  getProducts() {
    this.isLoading = true;
    this.productMngmntservice.getAllProductsWithPagination(this.currentPage).subscribe({
      next: (response: ProductsForPagination) => {
        this.productList = response.productList
        this.totalPages = response.totalPages
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.log(error)
      }
    })
  }

  nextPage() {
    if (this.isfilterApplied) {
      console.log("hello");
      
      this.currentPageForFilter++
      this.applyFilters()
    }
    else {
      this.currentPage++
      this.getProducts()
    }
    console.log(this.currentPage);
    console.log(this.currentPageForFilter);
  }

  previousPage() {
    if (this.isfilterApplied) {
      
      this.currentPageForFilter--
      this.applyFilters()
    }
    else {
      this.currentPage--
      this.getProducts()
    }
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
    this.isfilterApplied = true;
    this.productShowcaseService.minPrice = this.minPrice
    this.productShowcaseService.maxPrice = this.maxPrice
    this.productShowcaseService.categoryName = this.categoryName
    this.productShowcaseService.categoryId = Number(this.categoryId)
    this.productShowcaseService.brandId = Number(this.brandId)
    this.productShowcaseService.targetGender = this.gender
    this.productShowcaseService.newArrival = this.newArrival
    this.productShowcaseService.GetFilteredProductsWithPagination(this.currentPageForFilter).subscribe({
      next: (response: ProductsForPagination) => {
        this.productList = response.productList
        this.totalPages = response.totalPages
        if (this.productList.length == 0) {
          this.showResponseModal(false, 'No product found')
        }
        this.isLoading = false;
      },
      error: (error) => console.log(error)
    })
  }

  reset() {
    this.currentPage = 1;
    this.currentPageForFilter = 1;
    this.isfilterApplied = false;
    this.minPrice = undefined;
    this.maxPrice = undefined;
    this.categoryId = '';
    this.brandId = '';
    this.gender = '';
    this.getProducts()
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
