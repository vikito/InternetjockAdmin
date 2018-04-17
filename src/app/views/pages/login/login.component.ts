import { Component, NgModule } from '@angular/core';

@Component({
    selector    : 'login-page',
    templateUrl : './login.component.html',
    styleUrls   : ['./login.component.css']
})
export class LoginComponent {
    public title = 'Sign In';

    constructor(){}

    ngOnInit() {
    }

    login() {
        console.log(JSON.parse(localStorage.getItem('Session.System')));
        console.log(localStorage.getItem('Session.User'));
    }
}