import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { HomeComponent } from './pages/home/home.component'
import { SignupComponent } from './pages/signup/signup.component'
import { LoginComponent } from './pages/login/login.component'
import { FoodComponent } from './pages/food/food.component'
import { CartComponent } from './pages/cart/cart.component'
import { OrderListComponent } from './pages/order-list/order-list.component'
import { OrderAddComponent } from './pages/order-add/order-add.component'
import { SuccessComponent } from './pages/success/success.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'search/:searchTerm',
    component: HomeComponent,
  },
  {
    path: 'tag/:tag',
    component: HomeComponent,
  },
  {
    path: 'food/:id',
    component: FoodComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'order',
    component: OrderListComponent,
  },
  {
    path: 'order/create-new',
    component: OrderAddComponent,
  },
  {
    path: 'sign-up-success',
    component: SuccessComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
