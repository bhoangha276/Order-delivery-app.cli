import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, map } from 'rxjs'

import { User } from '../shared/model/User'
import { USERS_URL, USERS_BY_FILTER_URL } from '../shared/constants/urls'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.httpClient
      .get<{ data: User[] }>(`${USERS_URL}?page=1&limit=8&sortDirection=1`)
      .pipe(map(response => response.data))
  }

  getBySearchTerm(searchTerm: string): Observable<User[]> {
    return this.httpClient
      .get<{ data: User[] }>(`${USERS_BY_FILTER_URL}?name=${searchTerm}`)
      .pipe(map(response => response.data))
  }

  getUserById(userId: string): Observable<User> {
    return this.httpClient
      .get<{ data: User }>(`${USERS_URL}/${userId}`)
      .pipe(map(response => response.data))
  }
}
