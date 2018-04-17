import { Component } from '@angular/core';

@Component({
    selector    : 'leftbar',
    templateUrl : './leftbar.component.html'
})
export class LeftBarComponent {
    public title = 'Left Bars';
    public user : any;

    constructor() {
        this.user = JSON.parse(localStorage.getItem('Session.User'));
    }
}