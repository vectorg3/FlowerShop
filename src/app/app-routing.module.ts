import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './components/store/store.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './classes/auth.guard';
import { CartComponent } from './components/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';

const routes: Routes = [
  {
    path: 'store',
    component: StoreComponent,
  },
  {
    path: 'cart',
    canActivate: [AuthGuard],
    component: CartComponent,
  },
  {
    path: 'orders',
    canActivate: [AuthGuard],
    component: OrdersComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { showMenu: false },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { showMenu: false },
  },{
    path: '**',
    redirectTo: '/store',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
