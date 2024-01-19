import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, map } from 'rxjs'

import { Revenue } from '../shared/model/Invoice'
import { INVOICES_URL } from '../shared/constants/urls'

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private httpClient: HttpClient) {}

  getRevenue(year: string, month: string): Observable<Revenue[]> {
    return this.httpClient
      .get<{ data: Revenue[] }>(
        `${INVOICES_URL}/revenue?year=${year}&month=${month}`,
      )
      .pipe(map(response => response.data))
  }
}
