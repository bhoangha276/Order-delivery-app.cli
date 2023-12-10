import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { CartService } from 'src/app/services/cart.service'
import { OrderService } from 'src/app/services/order.service'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  orderForm!: FormGroup
  isSubmited = false
  returnUrl = ''

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private cartService: CartService,
    private activedRoute: ActivatedRoute,
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

    this.orderService
      .checkOut({
        amount: totalPrice,
        bankCode: '',
        language: 'vn',
      })
      .subscribe((result: string) => {
        const stringUrl: string = result

        window.location.href = stringUrl
      }),
      (error: any) => {
        console.error(error)
      }
  }
}
