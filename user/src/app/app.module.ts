import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { HomeComponent } from './pages/home/home.component'
import { FoodComponent } from './pages/food/food.component'
import { CartComponent } from './pages/cart/cart.component'
import { LoginComponent } from './pages/login/login.component'

import { HeaderComponent } from './components/header/header.component'
import { SearchComponent } from './components/search/search.component'
import { TagsComponent } from './components/tags/tags.component'
import { TitleComponent } from './components/title/title.component'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { OrderAddComponent } from './pages/order-add/order-add.component'
import { OrderListComponent } from './pages/order-list/order-list.component'
import { SignupComponent } from './pages/signup/signup.component'
import { SuccessComponent } from './pages/success/success.component'
import { ChatComponent } from './components/chat/chat.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    TagsComponent,
    FoodComponent,
    CartComponent,
    TitleComponent,
    NotFoundComponent,
    LoginComponent,
    OrderAddComponent,
    OrderListComponent,
    SignupComponent,
    SuccessComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      newestOnTop: false,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
