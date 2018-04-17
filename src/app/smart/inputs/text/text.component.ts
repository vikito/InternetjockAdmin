import { Component, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import { GLOBAL } from '../global.service';
declare var jQuery : any;
declare var $ : any;

@Component({
    selector        : 'smart-text',
    templateUrl     : './text.component.html',
    providers       : [GLOBAL]
})
export class TextComponent{
    @Input() id : string;
    @Input() placeholder : string;
    public idComponent : string;
    public placeholderComponent : string;

    constructor(
        private global: GLOBAL
    ) {
        this.idComponent = "input-" + global.getRandomNumber(1, 10000);
        this.placeholderComponent = this.idComponent;
    }

    ngOnInit() {
        this.idComponent = (this.id == undefined || this.id == null || this.id == '') ? this.idComponent : this.id;
        this.placeholderComponent = (this.placeholder == undefined || this.placeholder == null || this.placeholder == '') ? this.placeholderComponent : this.placeholder;
        
        $(document).ready(() => {
        });
    }
}