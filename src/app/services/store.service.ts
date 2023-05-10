import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/PRODUCT';
import { IOrder } from '../models/ORDER';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('https://flowershop-v2n3.onrender.com/products')
  }

  addToCart(product: IProduct){
    return this.http.post('https://flowershop-v2n3.onrender.com/cart', product)
  }
  getCart(): Observable<IProduct[]>{
    return this.http.get<IProduct[]>('https://flowershop-v2n3.onrender.com/cart')
  }
  removeFromCart(id: string){
    return this.http.delete(`https://flowershop-v2n3.onrender.com/cart/${id}`)
  }

  getOrders(): Observable<IOrder[]>{
    return this.http.get<IOrder[]>('https://flowershop-v2n3.onrender.com/orders')
  }
  createOrder(order: IOrder){
    return this.http.post('https://flowershop-v2n3.onrender.com/orders', order);
  }

}
