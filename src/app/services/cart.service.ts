import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/PRODUCT';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private url: string = 'https://flowerShop-v2n3.onrender.com';
  constructor(private http: HttpClient) {}
  addToCart(product: IProduct) {
    return this.http.post(`${this.url}/cart`, product);
  }
  getCart(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(
      `${this.url}/cart`
    );
  }
  removeFromCart(id: string) {
    return this.http.delete(`${this.url}/cart/${id}`);
  }
}
