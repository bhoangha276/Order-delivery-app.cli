import { Injectable } from '@angular/core'
import { Observable, map, tap } from 'rxjs'
import { IOrder } from '../shared/interfaces/IOrder'
import { ICheckoutVNP } from '../shared/interfaces/ICheckout'
import { Order } from '../shared/model/Order'
import { HttpClient } from '@angular/common/http'
import { ToastrService } from 'ngx-toastr'
import { ORDERS_URL, VNP_PAYMENT_URL } from '../shared/constants/urls'
import { CheckoutVNP } from '../shared/model/Checkout'

const ACCOUNT_KEY = 'Account'

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private httpClient: HttpClient,
    private toastrService: ToastrService,
  ) {}

  newOrder(orderData: IOrder): Observable<string> {
    let userStore = localStorage.getItem(ACCOUNT_KEY)
    let userData = userStore && JSON.parse(userStore)
    orderData.userID = userData._id

    return this.httpClient.post<{ id: string }>(ORDERS_URL, orderData).pipe(
      tap({
        error: (errorResponse: any) => {},
      }),
      map(response => response.id),
    )
  }

  checkOut(checkoutVNP: ICheckoutVNP): Observable<string> {
    return this.httpClient
      .post<{ vnpUrl: string }>(VNP_PAYMENT_URL, checkoutVNP)
      .pipe(map(response => response.vnpUrl))
  }

  getOrderByUserId(): Observable<Order[]> {
    let userStore = localStorage.getItem(ACCOUNT_KEY)
    let userData = userStore && JSON.parse(userStore)
    return this.httpClient
      .get<{ data: Order[] }>(`${ORDERS_URL}/${userData._id}`)
      .pipe(map(response => response.data))
  }
}
