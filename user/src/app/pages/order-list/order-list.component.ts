import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { OrderService } from '../../services/order.service'
import { Order } from '../../shared/model/Order'

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  orders: Order[] = []
  id: string = '64cbd4a097a3c6706459fdcb'

  constructor(private api: OrderService, activatedRoute: ActivatedRoute) {
    let ordersObservable: Observable<Order[]>

    activatedRoute.params.subscribe(params => {
      if (this.id) {
        ordersObservable = this.api.getOrderByUserId(this.id)
      }

      ordersObservable.subscribe(serverOrders => {
        this.orders = serverOrders
      })
    })
  }

  ngOnInit(): void {}
}
