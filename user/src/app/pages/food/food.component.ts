import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { CartService } from 'src/app/services/cart.service'
import { FoodService } from 'src/app/services/food.service'
import { Food } from 'src/app/shared/model/Food'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css'],
})
export class FoodComponent implements OnInit, OnDestroy {
  food!: Food
  private foodSubscription: Subscription | undefined

  constructor(
    activatedRoute: ActivatedRoute,
    private api: FoodService,
    private cartServices: CartService,
    private router: Router,
  ) {
    this.foodSubscription = activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.foodSubscription = api
          .getFoodById(params['id'])
          .subscribe(serverFood => {
            this.food = serverFood
          })
      }
    })
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    if (this.foodSubscription) {
      this.foodSubscription.unsubscribe()
    }
  }

  addToCart() {
    this.cartServices.addToCart(this.food)
    this.router.navigateByUrl('/')
  }
}
