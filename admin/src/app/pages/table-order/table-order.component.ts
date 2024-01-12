import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { OrderService } from 'src/app/services/order.service'
import { Order } from 'src/app/shared/model/Order'

@Component({
  selector: 'app-table-order',
  templateUrl: './table-order.component.html',
  styleUrls: ['./table-order.component.scss'],
})
export class TableOrderComponent implements OnInit, OnDestroy {
  orders: Order[] = []
  orderStatus = [
    'cancel',
    'processing',
    'confirmed',
    'cooking',
    'shipped',
    'delivered',
    'completed',
  ]
  private orderSubscription?: Subscription

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

  ngOnDestroy() {
    if (this.orderSubscription) {
      this.orderSubscription.unsubscribe()
    }
  }

  nextStatusOrder(orderId: string, orderStatus: number) {
    const orderStatusData = {
      status: orderStatus + 1,
    }

    this.orderSubscription = this.api
      .updateOrder(orderId, orderStatusData)
      .subscribe({
        next: () => {},
        error: (error: any) => {
          console.error('Update status order error!: ', error)
        },
      })

    // Assuming orderStatus should not exceed its maximum length
    const nextStatus = Math.min(orderStatus + 1, this.orderStatus.length - 1)
    // Update the order status in the orders array
    const orderIndex = this.orders.findIndex(order => order._id === orderId)
    if (orderIndex !== -1) {
      this.orders[orderIndex].status = nextStatus
    }
  }

  cancelStatusOrder(orderId: string) {
    const orderStatusData = {
      status: 0,
    }

    this.orderSubscription = this.api
      .updateOrder(orderId, orderStatusData)
      .subscribe({
        next: () => {},
        error: (error: any) => {
          console.error('Update status order error!: ', error)
        },
      })

    const orderIndex = this.orders.findIndex(order => order._id === orderId)
    if (orderIndex !== -1) {
      this.orders[orderIndex].status = 0
    }
  }
}
