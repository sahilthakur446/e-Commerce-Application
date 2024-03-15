export interface Product {
    productId: number;
    productName?: string;
    productDescription?: string;
    targetGender: number;
    price?: number;
    stockQuantity?: number;
    image?: File | null;
    imagePath?: string;
    categoryId?: number;
    brandId?: number;
    brandName?: string;
  }
  