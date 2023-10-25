import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FoodService } from 'src/app/services/food.service'
import { Food } from 'src/app/shared/model/Food'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  foods: Food[] = []

  constructor(private api: FoodService, activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(params => {
      let searchTerm = params['searchTerm']
      let searchTag = params['tag']

      if (searchTerm) {
        this.foods = this.api.getBySearchTerm(searchTerm)
      } else if (searchTag) {
        this.foods = this.api.getBySearchTag(searchTag)
      } else {
        this.foods = api.getAll()
      }
    })
  }

  ngOnInit(): void {}
}
