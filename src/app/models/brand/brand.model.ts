export interface createUpdateBrand{
    brandName:string
}

export interface BrandList{
    brandId:number
    brandName:string
}

export interface brandWithProductCount{
    brandId:number,
    brandName:string,
    productCount:number
}