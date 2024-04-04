import { UserCart } from "../cart/user-cart.model";
export interface AddUserOrder {
    userId: number;
    userCartItems: UserCart[];
    paymentId: string;
    totalAmount: number;
    userAddressId: number;
  }