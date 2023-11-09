import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { UserService } from 'src/app/services/user.service'
import { User } from 'src/app/shared/model/User'

@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.scss'],
})
export class TableUserComponent implements OnInit {
  users: User[] = []

  constructor(private api: UserService, activatedRoute: ActivatedRoute) {
    let usersObservable: Observable<User[]>

    activatedRoute.params.subscribe(params => {
      let searchTerm = params['searchTerm']

      if (searchTerm) {
        usersObservable = this.api.getBySearchTerm(searchTerm)
      } else {
        usersObservable = api.getAll()
      }

      usersObservable.subscribe(serverUsers => {
        this.users = serverUsers
      })
    })
  }

  ngOnInit(): void {}
}
