import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { FoodService } from 'src/app/services/food.service'
import { Food } from 'src/app/shared/model/Food'

@Component({
  selector: 'app-table-food',
  templateUrl: './table-food.component.html',
  styleUrls: ['./table-food.component.scss'],
})
export class TableFoodComponent implements OnInit {
  foods: Food[] = []

  constructor(private api: FoodService, activatedRoute: ActivatedRoute) {
    let foodsObservable: Observable<Food[]>

    activatedRoute.params.subscribe(params => {
      let searchTerm = params['searchTerm']

      if (searchTerm) {
        foodsObservable = this.api.getBySearchTerm(searchTerm)
      } else {
        foodsObservable = api.getAll()
      }

      foodsObservable.subscribe(serverFoods => {
        this.foods = serverFoods
      })
    })
  }

  ngOnInit(): void {}
}
 