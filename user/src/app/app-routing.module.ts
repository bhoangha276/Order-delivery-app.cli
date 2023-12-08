import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { HomeComponent } from './pages/home/home.component'
import { LoginComponent } from './pages/login/login.component'
import { FoodComponent } from './pages/food/food.component'
import { CartComponent } from './pages/cart/cart.component'
import { OrderComponent } from './pages/order/order.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
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
    component: OrderComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
