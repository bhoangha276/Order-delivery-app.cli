import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { BehaviorSubject, Observable, tap, map } from 'rxjs'
import { ToastrService } from 'ngx-toastr'

import { Account } from '../shared/model/Account'
import { IAccountSignup, IAccountLogin } from '../shared/interfaces/IAccount'
import { ACCOUNT_SIGNUP, ACCOUNT_LOGIN } from '../shared/constants/urls'

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

  signUp(accountSignup: IAccountSignup): Observable<any> {
    return this.httpClient
      .post<{ data: any }>(ACCOUNT_SIGNUP, accountSignup)
      .pipe(
        tap({
          error: (errorResponse: any) => {
            console.log(errorResponse)
            this.toastrService.error('Sign up failed!', 'Error')
          },
        }),
        map(response => {
          this.setAccountToLocalStorage(response.data)

          if (response.data !== null) {
            this.toastrService.success(
              'Sign up is successful!',
              `${response.data.email || 'Success'}`,
            )

            return response.data
          }

          this.toastrService.error('Sign up failed!', 'Error')
          return new Account()
        }),
      )
  }

  logIn(accountLogin: IAccountLogin): Observable<Account> {
    return this.httpClient
      .post<{ data: Account }>(ACCOUNT_LOGIN, accountLogin)
      .pipe(
        tap({
          error: (errorResponse: any) => {
            this.toastrService.error('Account not exist!', 'Error')
          },
        }),
        map(response => {
          this.setAccountToLocalStorage(response.data)

          if (response.data !== null) {
            this.toastrService.success(
              'Log in is successful!',
              `${response.data.email || 'Success'}`,
            )

            return response.data
          }

          this.toastrService.error('Log in failed!', 'Error')
          return new Account()
        }),
      )
  }

  logOut() {
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
