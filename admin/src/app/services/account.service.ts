import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { BehaviorSubject, Observable, map } from 'rxjs'

import { Account, Login } from '../shared/model/Account'
import { ACCOUNTS_LOGIN_URL } from '../shared/constants/urls'

const ACCOUNT_KEY = 'Admin-account'

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public accountSubject = new BehaviorSubject<Account>(
    this.getAccountTOLocalStorage(),
  )

  public accountObservable: Observable<Account>

  constructor(private httpClient: HttpClient) {
    this.accountObservable = this.accountSubject.asObservable()
  }

  login(accountLogin: Login) {
    return this.httpClient
      .post<{ data: Account }>(ACCOUNTS_LOGIN_URL, accountLogin)
      .pipe(
        map(response => {
          this.setAccountToLocalStorage(response.data)
          return response.data
        }),
      )
  }

  logout() {
    this.accountSubject.next(new Account())
    localStorage.removeItem(ACCOUNT_KEY)
    window.location.reload()
  }

  private setAccountToLocalStorage(account: Account) {
    localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account))
  }

  private getAccountTOLocalStorage(): Account {
    const accountJson = localStorage.getItem(ACCOUNT_KEY)

    if (accountJson) return JSON.parse(accountJson) as Account

    return new Account()
  }
}
