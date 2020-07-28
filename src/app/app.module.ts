import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { CarsComponent } from './cars/cars.component';
import { CarComponent } from './cars/car/car.component';
import { CarListComponent } from './cars/car-list/car-list.component';
import { CarService } from './shared/car.service';
import { ClaimsService } from './shared/claims.service';
import { HttpClientModule } from '@angular/common/http';
import { CarDetailsComponent } from './cars/car-details/car-details.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LayoutComponent } from './layout/layout.component';
import { ClaimsComponent } from './claims/claims.component';
import { ReportsComponent } from './reports/reports.component';
import { FinancesComponent } from './finances/finances.component';
import { FinanceComponent } from './finances/finance/finance.component';
import { FinanceListComponent } from './finances/finance-list/finance-list.component';
import { CarHistoryComponent } from './cars/car-history/car-history.component';
import { BankWelcomeComponent } from './bank/bank-welcome/bank-welcome.component';
import { BankFinancesComponent } from './bank/bank-finances/bank-finances.component';
import { BankHistoryComponent } from './bank/bank-history/bank-history.component';
import { BankContactComponent } from './bank/bank-contact/bank-contact.component';
import { DetranComponent } from './detran/detran.component';


@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    CarComponent,
    CarListComponent,
    CarDetailsComponent,
    WelcomeComponent,
    LayoutComponent,
    ClaimsComponent,
    ReportsComponent,
    FinancesComponent,
    FinanceComponent,
    FinanceListComponent,
    CarHistoryComponent,
    BankWelcomeComponent,
    BankFinancesComponent,
    BankHistoryComponent,
    BankContactComponent,
    DetranComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: WelcomeComponent, pathMatch: 'full'},
      {path: 'cars/:id', component: CarDetailsComponent},
      {path: 'cars', component: CarsComponent},
      {path: 'claims', component: ClaimsComponent},
      {path: 'reports', component: ReportsComponent},
      {path: 'finances', component: FinancesComponent},
      {path: 'welcome', component: WelcomeComponent},
      {path: 'history/:id', component: CarHistoryComponent}, 
      {path: 'bank-welcome', component: BankWelcomeComponent},
      {path: 'bank-finances', component: BankFinancesComponent},
      {path: 'bank-history/:id', component: BankHistoryComponent},
      {path: 'bank-history', component: BankHistoryComponent},
      {path: 'bank-contact', component: BankContactComponent},
      {path: 'detran', component: DetranComponent}
      ]),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [CarService, DatePipe, ClaimsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
