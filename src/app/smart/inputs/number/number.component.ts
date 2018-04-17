import { Component, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import { GLOBAL } from '../global.service';
declare var jQuery : any;
declare var $ : any;

@Component({
    selector        : 'smart-number',
    templateUrl     : './number.component.html',
    styles          : ['.numberText { text-align: right; }'],
    providers       : [GLOBAL]
})
export class NumberComponent{
    @Input() id : string;
    @Input() placeholder : string;
    public idComponent : string;
    public placeholderComponent : string;

    constructor(
        private global: GLOBAL
    ) {
        this.idComponent = "input-" + global.getRandomNumber(1, 10000);
        this.placeholderComponent = "Only Numbers";
    }

    ngOnInit() {
        this.idComponent = (this.id == undefined || this.id == null || this.id == '') ? this.idComponent : this.id;
        this.placeholderComponent = (this.placeholder == undefined || this.placeholder == null || this.placeholder == '') ? this.placeholderComponent : this.placeholder;
        
        $(document).ready(() => {
        });
    }

    onlyNumber(e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl/cmd+A
            (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
             // Allow: Ctrl/cmd+C
            (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
             // Allow: Ctrl/cmd+X
            (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    }
}