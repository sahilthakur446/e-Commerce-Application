export interface UserAddress{
    userAddressId:number,
    fullName:string,
    mobileNumber:number 
    houseNumber?:string 
    area?:string 
    landmark?:string 
    city:string
    state:string 
    pincode:number 
    isDefault:boolean
}