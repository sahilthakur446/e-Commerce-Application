export interface addCategory
{
    categoryName:string
    targetGender:string
}
export interface updateCategory
{
    categoryName?:string
    targetGender?:string
}
export interface categoryWithProductCount
{
    categoryId:number
    categoryName:string
    targetGender:string
    productCount:number
}