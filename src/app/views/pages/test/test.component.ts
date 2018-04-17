import { Component, NgModule } from '@angular/core';

@Component({
    selector    : 'test-page',
    templateUrl : './test.component.html',
    styleUrls   : ['./test.component.css']
})
export class TestComponent {
    public title = 'Test';

    constructor() {}

    ngOnInit() {}
}