import { Injectable } from '@angular/core'
import { Observable, map, tap } from 'rxjs'
import { IOrder } from '../shared/interfaces/IOrder'
import { ICheckoutVNP } from '../shared/interfaces/ICheckout'
import { Order } from '../shared/model/Order'
import { HttpClient } from '@angular/common/http'
import { ToastrService } from 'ngx-toastr'
import {
  ORDERS_URL,
  VNP_PAYMENT_URL,
} from '../shared/constants/urls'
import { CheckoutVNP } from '../shared/model/Checkout'

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private httpClient: HttpClient,
    private toastrService: ToastrService,
  ) {}

  newOrder(order: IOrder) {}

  checkOut(checkoutVNP: ICheckoutVNP): Observable<string> {
    return this.httpClient
      .post<{ vnpUrl: string }>(VNP_PAYMENT_URL, checkoutVNP)
      .pipe(map(response => response.vnpUrl))
  }

  getOrderByUserId(orderId: string): Observable<Order[]> {
    return this.httpClient
      .get<{ data: Order[] }>(`${ORDERS_URL}/${orderId}`)
      .pipe(map(response => response.data))
  }
}
