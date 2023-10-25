import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FoodService } from 'src/app/services/food.service'
import { Food } from 'src/app/shared/model/Food'

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css'],
})
export class FoodComponent implements OnInit {
  food!: Food

  constructor(activatedRoute: ActivatedRoute, private api: FoodService) {
    activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.food = api.getFoodById(params['id'])
      }
    })
  }

  ngOnInit(): void {}
}
