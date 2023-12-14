import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { Cart } from '../shared/model/Cart'
import { Food } from '../shared/model/Food'
import { CartItem } from '../shared/model/CartItem'

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = new Cart()
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart)

  constructor() {}

  addToCart(food: Food): void {
    let cartItem = this.cart.items.find(item => item.food._id === food._id)
    if (cartItem) return

    this.cart.items.push(new CartItem(food))
    this.setCartToLocalStorage()
  }

  removeFromCart(foodId: string): void {
    this.cart.items = this.cart.items.filter(item => item.food._id != foodId)
    this.setCartToLocalStorage()
  }

  changeQuantity(foodId: string, quantity: number) {
    let cartItem = this.cart.items.find(item => item.food._id === foodId)
    if (!cartItem) return

    cartItem.quantity = quantity
    cartItem.price = quantity * cartItem.food.price
    this.setCartToLocalStorage()
  }

  clearCart() {
    this.cart = new Cart()
    this.setCartToLocalStorage()
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable()
  }

  totalPrice(): number {
    return this.cart.items.reduce(
      (prevSum, currentItem) => prevSum + currentItem.price,
      0,
    )
  }

  totalCount(): number {
    return this.cart.items.reduce(
      (prevSum, currentItem) => prevSum + currentItem.quantity,
      0,
    )
  }

  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.totalPrice()
    this.cart.totalCount = this.totalCount()

    const cartJson = JSON.stringify(this.cart)
    localStorage.setItem('Cart', cartJson)
    this.cartSubject.next(this.cart)
  }

  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart')

    return cartJson ? JSON.parse(cartJson) : new Cart()
  }
}
