import { OrderItemDetails } from "./order-item-details.model";

export interface OrderDetails {
    userOrderId: number;
    paymentId: string;
    totalAmount: number;
    userAddressId: number;
    orderDate: Date;
    status: string;
    orderItems: OrderItemDetails[];
  }

  export interface OrderDetailsWithPaymentStatus {
    userOrderId: number;
    paymentId: string;
    paymentStatus:string;
    totalAmount: number;
    userAddressId: number;
    orderDate: Date;
    status: string;
    orderItems: OrderItemDetails[];
  }
  