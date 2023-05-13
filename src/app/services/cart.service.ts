import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/PRODUCT';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}
  addToCart(product: IProduct) {
    return this.http.post('https://flowershop-v2n3.onrender.com/cart', product);
  }
  getCart(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(
      'https://flowershop-v2n3.onrender.com/cart'
    );
  }
  removeFromCart(id: string) {
    return this.http.delete(`https://flowershop-v2n3.onrender.com/cart/${id}`);
  }
}
