import { Component, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import { GLOBAL } from '../global.service';
declare var jQuery : any;
declare var $ : any;
declare var moment : any;

@Component({
    selector        : 'smart-daterange',
    templateUrl     : './date-range.component.html',
    providers       : [GLOBAL]
})
export class DateRangeComponent{
    @Input() id : string;
    public idComponent : string;
    public textTime : string;

    constructor(
        private global: GLOBAL
    ) {
        this.idComponent = "input-" + global.getRandomNumber(1, 10000);
    }

    ngOnInit() {
        this.idComponent = (this.id == undefined || this.id == null || this.id == '') ? this.idComponent : this.id;
        
        $(document).ready(() => {
            var rangeDates = $('#' + this.idComponent);
            var rangeDateValue = $('#' + this.idComponent + ' span');

            rangeDateValue.html(moment().subtract(29, 'days').format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
            rangeDates.daterangepicker({
                format              : 'MM/DD/YYYY',
                startDate           : moment().subtract(29, 'days'),
                endDate             : moment(),
                minDate             : '01/01/2012',
                maxDate             : '12/31/2100',
                dateLimit           : { days: 60 },
                showDropdowns       : true,
                showWeekNumbers     : true,
                timePicker          : false,
                timePickerIncrement : 1,
                timePicker12Hour    : true,
                ranges              : {
                    'Today'         : [moment(), moment()],
                    'Yesterday'     : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'Last 7 Days'   : [moment().subtract(6, 'days'), moment()],
                    'Last 30 Days'  : [moment().subtract(29, 'days'), moment()],
                    'This Month'    : [moment().startOf('month'), moment().endOf('month')],
                    'Last Month'    : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                },
                opens               : 'right',
                drops               : 'down',
                buttonClasses       : ['btn', 'btn-sm'],
                applyClass          : 'btn-primary',
                cancelClass         : 'btn-default',
                separator           : ' to ',
                locale              : {
                    applyLabel          : 'Submit',
                    cancelLabel         : 'Cancel',
                    fromLabel           : 'From',
                    toLabel             : 'To',
                    customRangeLabel    : 'Custom',
                    daysOfWeek          : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr','Sa'],
                    monthNames          : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    firstDay            : 1
                }
            }, function(start, end, label) {
                rangeDateValue.html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
            });
        });
    }
}