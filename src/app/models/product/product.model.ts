export interface ProductInfo {
    productId: number;
    productName: string;
    productDescription: string;
    targetGender: number;
    price: number;
    stockQuantity: number;
    imagePath: string;
    categoryId: number;
    categoryName:string;
    brandId: number;
    brandName:string;
  }
  
  export interface AddProduct {
    productName: string;
    productDescription: string;
    targetGender: string;
    price: number;
    stockQuantity: number;
    image: File | undefined;
    categoryId: number;
    brandId: number;
  }

  export interface UpdateProduct {
    productName?: string;
    productDescription?: string;
    targetGender?: string;
    price?: number;
    stockQuantity?: number;
    image?: File | null;
    categoryId?: number;
    brandId?: number;
  }