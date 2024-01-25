import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { CartService } from 'src/app/services/cart.service'
import { OrderService } from 'src/app/services/order.service'

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css'],
})
export class OrderAddComponent implements OnInit, OnDestroy {
  orderForm!: FormGroup
  isSubmited = false
  returnUrl = ''
  private checkoutSubscription?: Subscription
  private orderSubscription?: Subscription

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
    })
  }

  ngOnDestroy(): void {
    if (this.checkoutSubscription) {
      this.checkoutSubscription.unsubscribe()
    }
  }

  get fc() {
    return this.orderForm.controls
  }

  order() {
    this.isSubmited = true

    if (this.orderForm.invalid) return

    const totalPrice = this.cartService.totalPrice() * 1000
    let checkoutData = {
      amount: totalPrice,
      bankCode: '',
      language: 'vn',
    }

    this.checkoutSubscription = this.orderService
      .checkOut(checkoutData)
      .subscribe({
        next: (result: string) => {
          const stringUrl: string = result
          window.location.href = stringUrl
        },
        error: (error: any) => {
          console.error('Checkout error: ', error)
        },
      })

    this.orderSubscription = this.orderService
      .newOrder({
        userID: '',
        address: this.fc['address'].value,
        dateTime: new Date(),
      })
      .subscribe({
        next: serverOrder => {
          console.log(serverOrder)
        },
        error: (error: any) => {
          console.error('Create order error: ', error)
        },
      })
  }
}
