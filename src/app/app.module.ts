import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router'
import { HttpModule } from '@angular/http';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { routing, appRoutingProviders } from './app.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';

//pages
import { AppComponent } from './app.component';
import { LoginComponent } from './views/pages/login/login.component';
import { SignInComponent } from './views/pages/login/sign-in/sign-in.component';
import { SignUpComponent } from './views/pages/login/sign-up/sign-up.component';
import { MasterComponent } from './views/pages/master/master.component';
import { HeaderComponent } from './views/pages/master/header.component';
import { LeftBarComponent } from './views/pages/master/leftbar.component';
import { DashboardComponent } from './views/pages/dashboard/dashboard.component';
import { UsersComponent } from './views/pages/users/users.component';

//components
import { DatatableComponent } from './smart/components/datatable/datatable.component';
import { TextComponent } from './smart/inputs/text/text.component';
import { NumberComponent } from './smart/inputs/number/number.component';
import { SelectComponent } from './smart/inputs/select/select.component';
import { MaskComponent } from './smart/inputs/mask/mask.component';
import { TimeComponent } from './smart/inputs/time/time.component';
import { DateComponent } from './smart/inputs/date/date.component';
import { DateRangeComponent } from './smart/inputs/date-range/date-range.component';

//services

//pipes
import { FormatComponent } from './smart/modules/format/format.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignInComponent,
    SignUpComponent,
    MasterComponent,
    HeaderComponent,
    LeftBarComponent,
    DashboardComponent,
    UsersComponent,
    DatatableComponent,
    TextComponent,
    NumberComponent,
    SelectComponent,
    MaskComponent,
    TimeComponent,
    DateComponent,
    DateRangeComponent,
    FormatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    HttpModule,
    DataTableModule,
    routing,
    NgbModule.forRoot()
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    Title,
    appRoutingProviders
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
