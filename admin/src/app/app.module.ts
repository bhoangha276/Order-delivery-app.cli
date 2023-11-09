import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon'
import { MatDividerModule } from '@angular/material/divider'
import { MatListModule } from '@angular/material/list'
import { MatExpansionModule } from '@angular/material/expansion'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { HeaderComponent } from './components/header/header.component'
import { SidebarComponent } from './components/sidebar/sidebar.component'
import { TitleComponent } from './components/title/title.component'

import { LoginComponent } from './pages/login/login.component'
import { HomeComponent } from './pages/home/home.component'
import { TableFoodComponent } from './pages/table-food/table-food.component';
import { TableUserComponent } from './pages/table-user/table-user.component';
import { TableEmployeeComponent } from './pages/table-employee/table-employee.component';
import { TableOrderComponent } from './pages/table-order/table-order.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    TitleComponent,
    TableFoodComponent,
    TableUserComponent,
    TableEmployeeComponent,
    TableOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
