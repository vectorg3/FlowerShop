import { IProduct } from "./PRODUCT";

export interface IOrder {
  _id?: string,
  orderList: IProduct[],
  totalPrice: number,
  status?: string,
  date?: string,
}
