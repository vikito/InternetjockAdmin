import { Component, OnInit, NgModule } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../../../../smart/services/login/login.service';

@Component({
    selector    : 'sign-in',
    templateUrl : './sign-in.component.html',
    styleUrls   : ['./sign-in.component.css'],
    providers   : [LoginService]
})
export class SignInComponent {
    public title = 'Sign In';

    constructor(
        private loginService: LoginService,
        private _router: Router
    ){}

    ngOnInit() {
    }

    onSubmit(userName, password) {
        this.loginService.authenticate(userName, password).subscribe((login) => {
            if(login){
                console.log(localStorage.getItem('Session.System'));
                console.log(localStorage.getItem('Session.User'));
                console.log(localStorage.getItem('Session.Menus'));

                this._router.navigate(['/dashboard']);
                location.reload();
            }
        }, (error) => {
            console.log(error);
        });
    }
}