import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrder } from '../models/ORDER';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  getOrders(): Observable<IOrder[]>{
    return this.http.get<IOrder[]>('https://flowershop-v2n3.onrender.com/orders')
  }
  createOrder(order: IOrder){
    return this.http.post('https://flowershop-v2n3.onrender.com/orders', order);
  }
}
