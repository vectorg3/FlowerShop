import { Component } from '@angular/core';
import { IOrder } from 'src/app/models/ORDER';
import { OrderService } from 'src/app/services/order.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  orders: IOrder[];
  isLoading = true;
  constructor(private OrderService: OrderService) {
  }
  loadOrders() {
    this.OrderService.getOrders().subscribe({
      next: (res) => {
        this.orders = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  ngOnInit() {
    this.loadOrders();
  }
}
