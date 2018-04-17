import { Component, NgModule } from '@angular/core';

@Component({
    selector    : 'sign-up',
    templateUrl : './sign-up.component.html',
    styleUrls   : ['./sign-up.component.css']
})
export class SignUpComponent {
    public title = 'Register';

    constructor(){}

    ngOnInit() {
    }

    login() {
        console.log(JSON.parse(localStorage.getItem('Session.System')));
        console.log(localStorage.getItem('Session.User'));
    }
}