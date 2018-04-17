import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector    : 'topbar',
    templateUrl : './header.component.html'
    // styleUrls   : ['./header.component.css']
})
export class HeaderComponent {
    public title = 'Sign In';
    public user : any;

    constructor(
        private _router: Router
    ){
        this.user = JSON.parse(localStorage.getItem('Session.User'));
    }

    logout() {
        localStorage.removeItem('Session.User');
        this._router.navigate(['/']);
        location.reload();
    }
}