import { Component, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import { GLOBAL } from '../global.service';
declare var jQuery : any;
declare var $ : any;

@Component({
    selector        : 'smart-time',
    templateUrl     : './time.component.html',
    providers       : [GLOBAL]
})
export class TimeComponent{
    @Input() id : string;
    @Input() placeholder : string;
    @Input() timeFormat : string;
    public idComponent : string;
    public placeholderComponent : string;
    public timeFormatComponent : string;

    constructor(
        private global: GLOBAL
    ) {
        this.idComponent = "input-" + global.getRandomNumber(1, 10000);
        this.placeholderComponent = 'Select Time';
        this.timeFormatComponent = 'hh:MM';
    }

    ngOnInit() {
        this.idComponent = (this.id == undefined || this.id == null || this.id == '') ? this.idComponent : this.id;
        this.placeholderComponent = (this.placeholder == undefined || this.placeholder == null || this.placeholder == '') ? this.placeholderComponent : this.placeholder;
        this.timeFormatComponent = (this.timeFormat == undefined || this.timeFormat == null || this.timeFormat == '') ? this.timeFormatComponent : this.timeFormat;
        
        $(document).ready(() => {
            $('#' + this.idComponent).datetimepicker({
                format: 'LT'
            });
        });
    }
}