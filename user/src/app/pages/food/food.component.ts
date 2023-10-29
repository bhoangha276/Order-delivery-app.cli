import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { CartService } from 'src/app/services/cart.service'
import { FoodService } from 'src/app/services/food.service'
import { Food } from 'src/app/shared/model/Food'

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css'],
})
export class FoodComponent implements OnInit {
  food!: Food

  constructor(
    activatedRoute: ActivatedRoute,
    private api: FoodService,
    private cartServices: CartService,
    private router: Router,
  ) {
    activatedRoute.params.subscribe(params => {
      if (params['id']) {
        api.getFoodById(params['id']).subscribe(serverFood => {
          this.food = serverFood
        })
      }
    })
  }

  ngOnInit(): void {}

  addToCart() {
    this.cartServices.addToCard(this.food)
    this.router.navigateByUrl('')
  }
}
