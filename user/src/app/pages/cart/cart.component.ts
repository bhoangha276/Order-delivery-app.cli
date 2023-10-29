import { Component, OnInit } from '@angular/core'
import { CartService } from 'src/app/services/cart.service'
import { Cart } from 'src/app/shared/model/Cart'
import { CartItem } from 'src/app/shared/model/CartItem'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart!: Cart

  constructor(private cartService: CartService) {
    this.cartService.getCartObservable().subscribe(cart => (this.cart = cart))
  }

  ngOnInit(): void {}

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.food._id)
  }

  changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = parseInt(quantityInString)
    this.cartService.changeQuantity(cartItem.food._id, quantity)
  }
}
