import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { OrderService } from '../../services/order.service'
import { Order } from '../../shared/model/Order'

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit, OnDestroy {
  orders: Order[] = []
  ordersSubscription: Subscription | undefined

  constructor(
    private api: OrderService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.ordersSubscription = this.activatedRoute.params.subscribe(() => {
      this.fetchOrders()
    })
  }

  ngOnDestroy() {
    if (this.ordersSubscription) {
      this.ordersSubscription.unsubscribe()
    }
  }

  private fetchOrders() {
    this.ordersSubscription = this.api.getOrderByUserId().subscribe({
      next: serverOrders => {
        this.orders = serverOrders
      },
      error: (error: any) => {
        console.error('Get Order List error: ', error)
      },
    })
  }
}
