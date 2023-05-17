import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TUI_SANITIZER,
  TuiButtonModule,
  TuiSvgModule,
  TuiDataListModule,
  TuiGroupModule,
  TuiScrollbarModule,
} from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreComponent } from './components/store/store.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {
  TuiInputComponent,
  TuiInputModule,
  TuiIslandModule,
  TuiRadioBlockModule,
  TuiRadioModule,
  TuiRatingModule,
} from '@taiga-ui/kit';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { TokenInterceptor } from './services/token-interceptor.service';
import { PreloaderComponent } from './components/ui/preloader/preloader.component';
import { CartComponent } from './components/cart/cart.component';
import { TuiCardModule, TuiInputCVCModule, TuiInputCardModule, TuiInputExpireModule } from '@taiga-ui/addon-commerce';
import { OrdersComponent } from './components/orders/orders.component';
import { DetailsComponent } from './components/store/details/details.component';
import { SortComponent } from './components/store/sort/sort.component';

@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    LoginComponent,
    RegisterComponent,
    SidenavComponent,
    PreloaderComponent,
    CartComponent,
    OrdersComponent,
    DetailsComponent,
    SortComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiRatingModule,
    TuiIslandModule,
    TuiInputModule,
    TuiButtonModule,
    TuiSvgModule,
    TuiInputCardModule,
    TuiDataListModule,
    TuiCardModule,
    TuiInputExpireModule,
    TuiInputCVCModule,
    TuiGroupModule,
    TuiScrollbarModule,
    TuiRadioModule,
    TuiRadioBlockModule
  ],
  providers: [
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
