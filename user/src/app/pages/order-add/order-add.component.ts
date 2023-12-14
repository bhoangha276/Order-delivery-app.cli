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
  private checkoutSubscription: Subscription | undefined

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

    this.orderService.newOrder({
      fullname: this.fc['fullname'].value,
      email: this.fc['email'].value,
      address: this.fc['address'].value,
      city: this.fc['city'].value,
    })

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
  }
}
