import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { FoodService } from 'src/app/services/food.service'
import { Food } from 'src/app/shared/model/Food'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  foods: Food[] = []
  private foodsSubscription: Subscription | undefined

  constructor(
    private api: FoodService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.foodsSubscription = this.activatedRoute.params.subscribe(params => {
      let searchTerm = params['searchTerm']
      let searchTag = params['tag']

      let foodsObservable: Observable<Food[]>

      if (searchTerm) {
        foodsObservable = this.api.getBySearchTerm(searchTerm)
      } else if (searchTag) {
        foodsObservable = this.api.getBySearchTag(searchTag)
      } else {
        foodsObservable = this.api.getAll()
      }

      this.foodsSubscription = foodsObservable.subscribe(serverFoods => {
        this.foods = serverFoods
      })
    })
  }

  ngOnDestroy(): void {
    if (this.foodsSubscription) {
      this.foodsSubscription.unsubscribe()
    }
  }
}
