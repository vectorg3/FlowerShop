import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrder } from '../models/ORDER';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url: string = 'https://webshop-server-r0tu.onrender.com';
  constructor(private http: HttpClient) { }
  getOrders(): Observable<IOrder[]>{
    return this.http.get<IOrder[]>(`${this.url}/orders`)
  }
  createOrder(order: IOrder){
    return this.http.post(`${this.url}/orders`, order);
  }
}
