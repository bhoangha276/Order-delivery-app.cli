import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { LoginComponent } from 'src/app/pages/login/login.component'
import { AccountService } from 'src/app/services/account.service'
import { Account } from 'src/app/shared/model/Account'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  account!: Account

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter()

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private accountService: AccountService,
  ) {
    accountService.accountObservable.subscribe(newAccount => {
      this.account = newAccount
    })
  }

  ngOnInit(): void {}

  toggleSidebar() {
    this.toggleSidebarForMe.emit()
  }

  loginAction() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '30%'
    this.dialog.open(LoginComponent, dialogConfig)
  }

  logoutAction() {
    this.accountService.logout()
  }

  get isAuth() {
    console.log(this.account.token)
    return this.account.token
  }
}
