import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, map } from 'rxjs'

import { Food } from '../shared/model/Food'
import {
  FOODS_URL,
  FOODS_BY_ID_URL,
  FOODS_BY_FILTER_URL,
} from '../shared/constants/urls'

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Food[]> {
    return this.httpClient
      .get<Food[]>(`${FOODS_URL}?page=1&limit=8&sortDirection=1`)
      .pipe(
        map((response: any) => {
          return response.data
        }),
      )
  }

  getBySearchTerm(searchTerm: string): Observable<Food[]> {
    return this.httpClient
      .get<Food[]>(`${FOODS_BY_FILTER_URL}?name=${searchTerm}`)
      .pipe(
        map((response: any) => {
          return response.data
        }),
      )
  }

  getFoodById(foodId: string): Observable<Food> {
    return this.httpClient.get<Food>(`${FOODS_BY_ID_URL}/${foodId}`).pipe(
      map((response: any) => {
        return response.data
      }),
    )
  }
}
