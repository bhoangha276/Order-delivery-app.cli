import { Injectable } from '@angular/core'
import { Food } from '../shared/model/Food'
import { sample_foods } from 'src/data'

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor() {}

  getAll(): Food[] {
    return sample_foods
  }
}
