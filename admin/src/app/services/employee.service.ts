import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, map } from 'rxjs'

import { Employee } from '../shared/model/Employee'
import {
  EMPLOYEES_URL,
  EMPLOYEES_BY_FILTER_URL,
} from '../shared/constants/urls'
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Employee[]> {
    return this.httpClient
      .get<{ data: Employee[] }>(
        `${EMPLOYEES_URL}?page=1&limit=8&sortDirection=1`,
      )
      .pipe(map(response => response.data))
  }

  getBySearchTerm(searchTerm: string): Observable<Employee[]> {
    return this.httpClient
      .get<{ data: Employee[] }>(
        `${EMPLOYEES_BY_FILTER_URL}?name=${searchTerm}`,
      )
      .pipe(map(response => response.data))
  }

  getEmployeeById(employeeId: string): Observable<Employee> {
    return this.httpClient
      .get<{ data: Employee }>(`${EMPLOYEES_URL}/${employeeId}`)
      .pipe(map(response => response.data))
  }
}
