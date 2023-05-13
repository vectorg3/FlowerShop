import { Component } from '@angular/core';
import { IProduct } from 'src/app/models/PRODUCT';
import { FormControl, FormGroup } from '@angular/forms';
import { StoreService } from 'src/app/services/store.service';
import { Toast } from '../ui/toasts/toast';
import { IOrder } from 'src/app/models/ORDER';
import Swal from 'sweetalert2';
import {
  tuiCardExpireValidator,
  tuiCardNumberValidator,
} from '@taiga-ui/addon-commerce';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cart: IProduct[];
  order: IOrder = { orderList: [], totalPrice: 0 };
  totalPrice: number = 0;
  isLoading: boolean = true;
  readonly form = new FormGroup({
    owner: new FormControl(''),
    card: new FormControl('', [tuiCardNumberValidator]),
    expire: new FormControl('', [tuiCardExpireValidator]),
    cvc: new FormControl(''),
  });

  constructor(private CartService: CartService, private OrderService: OrderService) {}
  get card(): string | null {
    const value: string | null | undefined = this.form.get('card')?.value;

    if ((value?.length ?? 0) < 7) {
      return null;
    }

    switch (value?.charAt(0)) {
      case '0':
      case '1':
      case '2':
        return 'https://ng-web-apis.github.io/dist/assets/images/common.svg';
      case '3':
      case '4':
      case '5':
        return 'https://ng-web-apis.github.io/dist/assets/images/geolocation.svg';
      case '6':
      case '7':
        return 'https://ng-web-apis.github.io/dist/assets/images/intersection-observer.svg';
      case '8':
      case '9':
      default:
        return 'https://ng-web-apis.github.io/dist/assets/images/payment-request.svg';
    }
  }
  loadCart() {
    this.CartService.getCart().subscribe({
      next: (res) => {
        this.totalPrice = 0;
        this.cart = res;
        this.isLoading = false;
        this.cart?.forEach((item) => {
          this.totalPrice += item.price;
        });
      },
      error: (err) => {
        console.warn(err);
      },
    });
  }
  removeFromCart(id: string) {
    this.CartService.removeFromCart(id).subscribe({
      next: () => {
        Toast.fire({
          icon: 'success',
          title: 'Товар успешно удалён из корзины',
        });
        this.totalPrice = 0;
        this.loadCart();
      },
      error: (err) => {
        Toast.fire({
          icon: 'error',
          title: `${err.msg}`,
        });
      },
    });
  }
  createOrder() {
    if (this.cart.length !== 0) {
      if (
        this.form.value.card?.length! < 16 ||
        this.form.value.expire?.length! < 5 ||
        this.form.value.cvc?.length! < 3 ||
        this.form.value.owner?.length! < 3
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Вы не заполнили данные карты',
        });
        return;
      }
      this.order.orderList = this.cart;
      this.order.totalPrice = this.totalPrice;
      this.OrderService.createOrder(this.order).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Заказ успешно создан',
            text: 'Вы можете посмотреть его в разделе "Заказы"',
          });
          this.loadCart();
        },
        error: (err) => {
          Toast.fire({
            icon: 'error',
            title: `${err.msg}`,
          });
        },
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Ваша корзина пуста',
        text: 'Добавьте туда товары',
      });
    }
  }
  ngOnInit() {
    this.loadCart();
  }
}
