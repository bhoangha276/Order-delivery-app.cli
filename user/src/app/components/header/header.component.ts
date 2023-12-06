import { Component, OnInit } from '@angular/core'
import { AccountService } from 'src/app/services/account.service'
import { CartService } from 'src/app/services/cart.service'
import { Account } from 'src/app/shared/model/Account'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  cartQuantity = 0
  account!: Account

  constructor(
    cartService: CartService,
    private accountService: AccountService,
  ) {
    cartService.getCartObservable().subscribe(newCart => {
      this.cartQuantity = newCart.totalCount
    })
    accountService.accountObservable.subscribe(newAccount => {
      this.account = newAccount
    })
  }

  ngOnInit(): void {}

  logout() {
    this.accountService.logout()
  }

  get isAuth() {
    // console.log(this.account.token)
    return this.account.token
  }
}
