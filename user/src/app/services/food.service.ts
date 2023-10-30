import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { sample_foods, sample_tags } from 'src/data'
import { Food } from '../shared/model/Food'
import { Tag } from '../shared/model/Tag'
import {
  FOODS_URL,
  FOODS_BY_ID_URL,
  FOODS_BY_NAME_URL,
  FOODS_BY_TAG_URL,
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
      .get<Food[]>(`${FOODS_BY_NAME_URL}?name=${searchTerm}`)
      .pipe(
        map((response: any) => {
          return response.data
        }),
      )
  }

  getBySearchTag(tag: string): Observable<Food[]> {
    return tag === 'Tất cả'
      ? this.httpClient
          .get<Food[]>(`${FOODS_URL}?page=1&limit=8&sortDirection=1`)
          .pipe(
            map((response: any) => {
              return response.data
            }),
          )
      : this.httpClient.get<Food[]>(`${FOODS_BY_TAG_URL}?tag=${tag}`).pipe(
          map((response: any) => {
            return response.data
          }),
        )
  }

  getAllTags(): Tag[] {
    return sample_tags
  }

  getFoodById(foodId: string) {
    return this.httpClient.get<Food>(`${FOODS_BY_ID_URL}/${foodId}`).pipe(
      map((response: any) => {
        return response.data
      }),
    )
  }
}
