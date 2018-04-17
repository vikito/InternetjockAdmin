import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import { LoginComponent } from './views/pages/login/login.component';
import { SignInComponent } from './views/pages/login/sign-in/sign-in.component';
import { SignUpComponent } from './views/pages/login/sign-up/sign-up.component';
import { MasterComponent } from './views/pages/master/master.component';
import { DashboardComponent } from './views/pages/dashboard/dashboard.component';

const appRoutes : Routes = [
    { path : '', component : LoginComponent, children: [ { path : '', component: SignInComponent } ] },
    { path : 'login', component : LoginComponent, children: [ { path : '', component: SignInComponent } ] },
    { path : 'register', component : LoginComponent, children: [ { path : '', component: SignUpComponent } ] },
    { path : 'dashboard', component : MasterComponent, children: [ { path : '', component: DashboardComponent } ] },
    { path : '**', component : LoginComponent, children: [ { path : '', component: SignInComponent } ] }
];

export const appRoutingProviders : any[] = [];
export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);