import { Component, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import { GLOBAL } from '../global.service';
declare var jQuery : any;
declare var $ : any;

@Component({
    selector        : 'smart-mask',
    templateUrl     : './mask.component.html',
    providers       : [GLOBAL]
})
export class MaskComponent{
    @Input() id : string;
    @Input() placeholder : string;
    @Input() mask : string;
    public idComponent : string;
    public placeholderComponent : string;
    public maskTypeComponent : string;    

    constructor(
        private global: GLOBAL
    ) {
        this.idComponent = 'input-' + global.getRandomNumber(1, 10000);
        this.placeholderComponent = '(000) 000-0000';
        //phone (999) 999-9999
        //phoneext (000) 999-9999 xt. 99999
        //social 999-99-9999
        //driverlic A9999999
        this.maskTypeComponent = '(999) 999-9999';//"99/99/9999","(999) 999-9999");,"99-9999999","999-99-9999","aaa-9999-a","a*-999-a999"
    }

    ngOnInit() {
        this.idComponent = (this.id == undefined || this.id == null || this.id == '') ? this.idComponent : this.id;
        
        if(this.mask == undefined || this.mask == null || this.mask == '') {
            this.placeholderComponent = this.placeholderComponent;
            this.maskTypeComponent = this.maskTypeComponent;
        } else {
            if(this.mask.toLowerCase() == 'phone') {
                this.placeholderComponent = '(000) 000-0000';
                this.maskTypeComponent = '(999) 999-9999';
            }
            if(this.mask.toLowerCase() == 'phoneext') {
                this.placeholderComponent = '(000) 000-0000 EXT. 00000';
                this.maskTypeComponent = '(999) 999-9999 EXT. 99999';
            }
            if(this.mask.toLowerCase() == 'social') {
                this.placeholderComponent = '000-00-0000';
                this.maskTypeComponent = '999-99-9999';
            }
            if(this.mask.toLowerCase() == 'driverlic') {
                this.placeholderComponent = 'A0000000';
                this.maskTypeComponent = 'a9999999';
            }
        }
        
        $(document).ready(() => {
            $("#" + this.idComponent).mask(this.maskTypeComponent);
        });
    }
}