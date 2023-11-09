import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/shared/model/Employee';

@Component({
  selector: 'app-table-employee',
  templateUrl: './table-employee.component.html',
  styleUrls: ['./table-employee.component.scss']
})
export class TableEmployeeComponent implements OnInit {
  employees: Employee[] = []

  constructor(private api: EmployeeService, activatedRoute: ActivatedRoute) {
    let employeesObservable: Observable<Employee[]>

    activatedRoute.params.subscribe(params => {
      let searchTerm = params['searchTerm']

      if (searchTerm) {
        employeesObservable = this.api.getBySearchTerm(searchTerm)
      } else {
        employeesObservable = api.getAll()
      }

      employeesObservable.subscribe(serverEmployees => {
        this.employees = serverEmployees
      })
    })
  }

  ngOnInit(): void {}
}
