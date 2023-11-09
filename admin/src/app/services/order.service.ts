import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, map } from 'rxjs'

import { Order } from '../shared/model/Order'
import { ORDERS_URL, ORDERS_BY_FILTER_URL } from '../shared/constants/urls'

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Order[]> {
    return this.httpClient
      .get<{ data: Order[] }>(`${ORDERS_URL}?page=1&limit=8&sortDirection=1`)
      .pipe(map(response => response.data))
  }

  getBySearchTerm(searchTerm: string): Observable<Order[]> {
    return this.httpClient
      .get<{ data: Order[] }>(`${ORDERS_BY_FILTER_URL}?name=${searchTerm}`)
      .pipe(map(response => response.data))
  }

  getOrderById(orderId: string): Observable<Order> {
    return this.httpClient
      .get<{ data: Order }>(`${ORDERS_URL}/${orderId}`)
      .pipe(map(response => response.data))
  }
}
