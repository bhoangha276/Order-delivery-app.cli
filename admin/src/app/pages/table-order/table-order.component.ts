import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { OrderService } from 'src/app/services/order.service'
import { Order } from 'src/app/shared/model/Order'

@Component({
  selector: 'app-table-order',
  templateUrl: './table-order.component.html',
  styleUrls: ['./table-order.component.scss'],
})
export class TableOrderComponent implements OnInit {
  orders: Order[] = []

  constructor(private api: OrderService, activatedRoute: ActivatedRoute) {
    let ordersObservable: Observable<Order[]>

    activatedRoute.params.subscribe(params => {
      let searchTerm = params['searchTerm']

      if (searchTerm) {
        ordersObservable = this.api.getBySearchTerm(searchTerm)
      } else {
        ordersObservable = api.getAll()
      }

      ordersObservable.subscribe(serverOrders => {
        this.orders = serverOrders
      })
    })
  }

  ngOnInit(): void {}
}
