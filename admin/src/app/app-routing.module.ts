import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { HomeComponent } from './pages/home/home.component'
import { LoginComponent } from './pages/login/login.component'
import { TableUserComponent } from './pages/table-user/table-user.component'
import { TableEmployeeComponent } from './pages/table-employee/table-employee.component'
import { TableFoodComponent } from './pages/table-food/table-food.component'
import { TableOrderComponent } from './pages/table-order/table-order.component'

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: '**', redirectTo: 'login', pathMatch: 'full' },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'tables/user',
    component: TableUserComponent,
  },
  {
    path: 'tables/employee',
    component: TableEmployeeComponent,
  },
  {
    path: 'tables/food',
    component: TableFoodComponent,
  },
  {
    path: 'tables/order',
    component: TableOrderComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
