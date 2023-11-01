import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { BehaviorSubject, Observable, tap, map } from 'rxjs'
import { ToastrService } from 'ngx-toastr'

import { Account } from '../shared/model/Account'
import { IAccountLogin } from '../shared/interfaces/IAccountLogin'
import { ACCOUNT_LOGIN } from '../shared/constants/urls'

const ACCOUNT_KEY = 'Account'

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public accountSubject = new BehaviorSubject<Account>(
    this.getAccountTOLocalStorage(),
  )
  public accountObservable: Observable<Account>

  constructor(
    private httpClient: HttpClient,
    private toastrService: ToastrService,
  ) {
    this.accountObservable = this.accountSubject.asObservable()
  }

  login(accountLogin: IAccountLogin): Observable<Account> {
    return this.httpClient.post<Account>(ACCOUNT_LOGIN, accountLogin).pipe(
      tap({
        error: (errorResponse: any) => {
          this.toastrService.error('Account not exist!', 'Login failed')
        },
      }),
      map((response: any) => {
        this.setAccountToLocalStorage(response.data)

        if (response.data !== null) {
          this.toastrService.success(
            `${response.data.email} - Login is successful!`,
          )

          return response.data
        }

        this.toastrService.error('Login failed!')
        return new Account()
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
