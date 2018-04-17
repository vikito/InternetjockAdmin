import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-format',
  templateUrl: './format.component.html',
  styleUrls: ['./format.component.scss']
})
export class FormatComponent implements OnInit {

  formatPhone: string = "Format Phone";
  @Input() phoneColumn: string;
  @Input() dataField: any;
  @Input() resultFormatField: any;
  @Input() columnFormat: string;
  @Input() numDecimal: number;
  public simbol: any;
  public separador: any; // separador para los miles
  public sepDecimal: any;

  constructor() { }

  public getFormatPhone() {
    this.resultFormatField = this.dataField.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, '($1) $2-$3');//"(818) 222-2222"+ this.phoneColumn;
  }

  public getIntegerFormat() {
    this.resultFormatField = Math.floor(this.dataField);
  }

  public getNumero() {
    this.getFormatCurrency(this.dataField, 0, '');
  }
  public getNumeroWithDecimales(numDecimal: number) {
    this.getFormatCurrency(this.dataField, numDecimal, '');
  }
  public getCurrency(numDecimal) {
    this.getFormatCurrency(this.dataField, numDecimal, '$');
  }

  public formatCurrency(number, numDecimales) {
    this.separador = ','; // separador para los miles
    this.sepDecimal = '.';
    num += '';

    /** */
    var num = Number(number).toFixed(numDecimales);
    /** */
    var splitStr = num.split('.');

    var splitLeft = splitStr[0];
    var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
    var regx = /(\d+)(\d{3})/;
    while (regx.test(splitLeft)) {
      splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
    }
    return this.simbol + splitLeft + splitRight;
  }
  public getFormatCurrency(num, numDecimales, simbol) {

    this.simbol = simbol || '';
    this.resultFormatField = this.formatCurrency(num, numDecimales);

  }

  public getFormatDate(type) {
    var d = new Date();
    if(isNaN(this.dataField)) {
      d = new Date(this.dataField);
    } else {
      d = new Date(0);
      d.setUTCSeconds(this.dataField);
    }
    //var d = new Date(this.dataField);
    var am_pm = d.getHours() >= 12 ? "PM" : "AM";

    if (type === 'DateTime') {
      /*this.resultFormatField = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
     d.getHours() + ":" + d.getMinutes();*/
      this.resultFormatField = ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) + "-" +
        d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + " " + am_pm;

    } if (type === 'Date') {

      this.resultFormatField = ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) + "-" +
        d.getFullYear();

    } if (type === 'Time') {

      this.resultFormatField = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + " " + am_pm;

    }
  }


  public getByColumnFormat() {

    if (this.columnFormat === 'Phone') {
      this.getFormatPhone();
    }
    if (this.columnFormat === 'Integer') {
      this.getIntegerFormat();
    }
    if (this.columnFormat === 'Numero') {
      this.getNumero();
    }
    if (this.columnFormat === 'NumeroWithDecimales') {
      this.getNumeroWithDecimales(2);
    }
    if (this.columnFormat === 'Currency') {
      this.getCurrency(this.numDecimal);
    }
    if (this.columnFormat === 'Date') {
      this.getFormatDate('Date');
    }
    if (this.columnFormat === 'DateTime') {
      this.getFormatDate('DateTime');
    }
    if (this.columnFormat === 'Time') {
      this.getFormatDate('Time');
    }
    if (this.columnFormat === '') {
      this.resultFormatField = this.dataField;
    }

  }
  ngOnInit() {
    this.getByColumnFormat();
  }

}
