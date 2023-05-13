import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IProduct } from 'src/app/models/PRODUCT';
import { Products } from 'src/app/constants/products';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { Toast } from '../ui/toasts/toast';
import Swal from 'sweetalert2';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent {
  rateValue: Number = 4.5;
  products: IProduct[] = [];
  isLoading = true;
  constructor(private StoreService: StoreService, private CartService: CartService, private router: Router, private auth: AuthService) {}
  ngOnInit(){
    this.getProducts();
  }
  getProducts(){
    this.StoreService.getProducts().subscribe({
      next: (response) => {
        this.products = response;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  addToCart(product: IProduct){
    if (!this.auth.isAuth()){
      Swal.fire({
        icon: 'error',
        text: 'Для этого вам нужно авторизоваться',
      })
      return;
    }
    this.CartService.addToCart(product).subscribe({
      next: () => {
        Toast.fire({
          icon: 'success',
          title: 'Товар успешно добавлен в корзину',
        });
      },
      error: (err) => {
        Toast.fire({
          icon: 'error',
          title: `${err.msg}`,
        });
      }
    })
  }
}
