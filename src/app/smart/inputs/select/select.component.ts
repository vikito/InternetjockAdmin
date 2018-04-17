import { Component, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import { GLOBAL } from '../global.service';
declare var jQuery : any;
declare var $ : any;

@Component({
    selector        : 'smart-select',
    templateUrl     : './select.component.html',
    providers       : [GLOBAL]
})
export class SelectComponent{
    @Input() id : string;
    @Input() placeholder : string;
    @Input() datas : any[];// [{ "value" : "0", "text" : "Select Item" }];

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
            var options = '<option value="0">Select Item</option>';
            var data = this.datas;

            if(this.datas == undefined || this.datas == null || this.datas.length == 0) {
                options = '<option value="0">Select Item</option>';
            } else {
                for(var i = 0; i < data.length; i++) {
                    if(data[i].nameGroup) {
                        options += '<optgroup label="' + data[i].nameGroup + '">';
                        
                        for(var j = 0; j < data[i].datas.length; j++) {
                            options += '<option value="' + data[i].datas[j].value + '">' + data[i].datas[j].text + '</option>';
                        }
    
                        options += '</optgroup>';
                    } else {
                        options += '<option value="' + data[i].value + '">' + data[i].text + '</option>';
                    }                
                }
            }            

            $("#" + this.idComponent).html(options);
            $("#" + this.idComponent).select2();
        });
    }
}