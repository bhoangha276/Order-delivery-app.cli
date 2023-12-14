import { Component, OnInit, OnDestroy } from '@angular/core'
import { CartService } from 'src/app/services/cart.service'
import { Cart } from 'src/app/shared/model/Cart'
import { CartItem } from 'src/app/shared/model/CartItem'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  cart!: Cart
  private cartSubscription: Subscription | undefined

  constructor(private cartService: CartService) {
    this.cartSubscription = this.cartService
      .getCartObservable()
      .subscribe(cart => (this.cart = cart))
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe()
    }
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.food._id)
  }

  changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = parseInt(quantityInString)
    this.cartService.changeQuantity(cartItem.food._id, quantity)
  }
}
