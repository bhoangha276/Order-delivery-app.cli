import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { OrderService } from '../../services/order.service'
import { Order } from '../../shared/model/Order'

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  orders: Order[] = []
  ordersSubscription: Subscription | undefined

  constructor(private api: OrderService, activatedRoute: ActivatedRoute) {
    let ordersObservable: Observable<Order[]>

    activatedRoute.params.subscribe(params => {
      ordersObservable = this.api.getOrderByUserId()

      this.ordersSubscription = ordersObservable.subscribe(serverOrders => {
        this.orders = serverOrders
      })
    })
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    if (this.ordersSubscription) {
      this.ordersSubscription.unsubscribe()
    }
  }
}
