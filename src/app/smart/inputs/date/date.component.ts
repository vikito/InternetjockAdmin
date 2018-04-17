import { Component, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import { GLOBAL } from '../global.service';
declare var jQuery : any;
declare var $ : any;

@Component({
    selector        : 'smart-date',
    templateUrl     : './date.component.html',
    providers       : [GLOBAL]
})
export class DateComponent{
    @Input() id : string;
    @Input() placeholder : string;
    @Input() dateFormat : string;
    public idComponent : string;
    public placeholderComponent : string;
    public dateFormatComponent : string;

    constructor(
        private global: GLOBAL
    ) {
        this.idComponent = "input-" + global.getRandomNumber(1, 10000);
        this.placeholderComponent = 'Select Date';
        this.dateFormatComponent = 'mm/dd/yyyy';
    }

    ngOnInit() {
        this.idComponent = (this.id == undefined || this.id == null || this.id == '') ? this.idComponent : this.id;
        this.placeholderComponent = (this.placeholder == undefined || this.placeholder == null || this.placeholder == '') ? this.placeholderComponent : this.placeholder;
        this.dateFormatComponent = (this.dateFormat == undefined || this.dateFormat == null || this.dateFormat == '') ? this.dateFormatComponent : this.dateFormat;
        
        $(document).ready(() => {
            $('#' + this.idComponent).datepicker({
                todayHighlight: true,
                autoclose: true,
                format: this.dateFormatComponent
            });
        });
    }
}