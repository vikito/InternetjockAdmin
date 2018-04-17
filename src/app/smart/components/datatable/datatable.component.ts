import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormatComponent } from '../../modules/format/format.component';
import * as _ from 'lodash';

@Component({
  selector: 'smart-table',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {
  @Input() columns = [];
  @Input() list = [];
  @Input() rowsOnPage = 10;
  @Input() totalRows;
  @Input() loading = true;
  @Input() rowsOnPagePaginator;
  @Input() heightDatatable: string;
  @Input() widthDatatable: string;
  @Output() clickMethod = new EventEmitter();
  private listComplete = [];
  private infoDatatableJson = [];
  private infoEventsRowsJson = [];
  private arraySearch = [];
  private searchTable = ""
  private colSpan = 0;

  constructor() {}  

  ngOnInit() {
    var n = this.columns.length;
    
    for(var i = 0; i < n; i++) {
      if(this.columns[i].IsField == 'field') {
        this.infoDatatableJson.push(this.columns[i]);
        this.arraySearch.push(this.columns[i].Field);
      }
      if(this.columns[i].IsField == 'action') {
        this.infoEventsRowsJson.push(this.columns[i]);
      }
    }

    this.colSpan = this.infoDatatableJson.length + this.infoEventsRowsJson.length;
    console.log('Tamanio leido como parametro desde el componente:->', this.widthDatatable);
    this.rowsOnPage = this.rowsOnPagePaginator;
    var rowsevent = this.rowsOnPage;
    /*(<HTMLInputElement>document.getElementById('searchDatatable')).addEventListener('keyup', function (event) {
      event.preventDefault();
      if (event.keyCode === 8) {
        var rows = (<HTMLElement>document.getElementsByTagName('tbody')[0]).getElementsByTagName('tr').length;
        var element = <HTMLElement>document.getElementById('tHeadRowsMin');
        if (rows < rowsevent) {
          element.classList.add('tHeadRowsMin');
        } else {
          element.classList.remove('tHeadRowsMin');
        }
      }
    });*/

    
  }

  resiseDatatableByPx(widthDatatable, infoDatatableJson, infoEventsRowsJson) {
    var whidtNumber = this.getNumber(widthDatatable);
    var simbol = this.getSimbol(widthDatatable);
    var totalWidthByColumnsFields = this.getTotalWidthDatatableByColumnsFields(infoDatatableJson);
    var totalWidthByColumnsActions = this.getTotalWidthDatatableByColumnsActions(infoEventsRowsJson, whidtNumber, simbol, widthDatatable);
    var totalWhidthDatatable = totalWidthByColumnsFields + totalWidthByColumnsActions;
    console.log('totalWidthByColumnsFields:-->', totalWidthByColumnsFields);
    console.log('totalWidthByColumnsActions--->', totalWidthByColumnsActions);
    console.log('totalWhidthDatatable....-->', totalWhidthDatatable);
    if (parseInt(whidtNumber, 10) > totalWhidthDatatable) {
      var forDistrib = parseInt(whidtNumber, 10) - totalWhidthDatatable;// Cantidad para distribuir a las columnas que no son fijas
      var numberColumnsFixedFalse = this.getNumberColumnsFixed(infoDatatableJson);// Numero de columnas que nos son fijas
      var numberCorrespond = forDistrib / numberColumnsFixedFalse;// Cantidad que le corresponde a columnas que no son fijas
      for (const userConst of this.infoDatatableJson) {
        if (userConst.ColumnFixed === false) {
          var widthNumber = this.getNumber(userConst.ColumnWidth);
          var simbolColumn = this.getSimbol(userConst.ColumnWidth);
          var sumWitdth = parseInt(widthNumber, 10) + numberCorrespond;
          userConst.ColumnWidth = sumWitdth.toString() + simbolColumn;
        }
      }

    }
  }

  getNumber(widthString) {
    var number = '';
    if (widthString.indexOf('p') !== -1) {
      var numWithougtSimbol = widthString.replace('px', '');
      number = numWithougtSimbol.trim();
    } else {
      if (widthString.indexOf('%') !== -1) {
        var numWithougtSimbol = widthString.replace('%', '');
        number = numWithougtSimbol.trim();
      }
    }
    return number;
  }

  getSimbol(widthString) {
    var simbol = '';
    if (widthString.indexOf('p') !== -1) {
      simbol = 'px';
    } else {
      if (widthString.indexOf('%') !== -1) {
        simbol = '%';
      }
    }
    return simbol;
  }

  getTotalWidthDatatableByColumnsFields(infoDatatableJson) {
    var resultTotal = 0;
    for (const userConst of this.infoDatatableJson) {
      var numberWidth = parseInt(this.getNumber(userConst.ColumnWidth), 10);
      resultTotal = resultTotal + numberWidth;
    }
    return resultTotal;
  }

  getTotalWidthDatatableByColumnsActions(infoEventsRowsJson, whidtNumber, simbolWidthDatatable, widthDatatable) {
    var resultTotal = 0;
    var resultTotalPercent = 0;
    for (const userConst of this.infoEventsRowsJson) {
      var simbol = this.getSimbol(userConst.ColumnWidth);
      var numberWidth = parseInt(this.getNumber(userConst.ColumnWidth), 10);
      resultTotal = resultTotal + numberWidth;
    }
    if (simbolWidthDatatable === 'px') {
      if (simbol === 'px') {
        return resultTotal;
      } else {
        if (simbol === '%') {
          resultTotalPercent = (whidtNumber * resultTotal) / 100;
          return resultTotalPercent;
        }
      }
    } if (simbolWidthDatatable === '%') {
      return resultTotal;
    }
  }

  getNumberColumnsFixed(infoDatatableJson) {
    var numberColumsnFixed = 0;
    for (const userConst of this.infoDatatableJson) {
      if (userConst.ColumnFixed === false) {
        numberColumsnFixed = numberColumsnFixed + 1;
      }
    }
    return numberColumsnFixed;
  }

  pageUpdate() {
    var rows = (<HTMLElement>document.getElementsByTagName('tbody')[0]).getElementsByTagName('tr').length;
    this.rowsOnPagePaginator = rows;
    if (rows < this.rowsOnPage) {
      var element = <HTMLElement>document.getElementById('tHeadRowsMin');
      element.classList.add('tHeadRowsMin');
      element.classList.remove('tHeadRowsMax');
    } else {
      var element = <HTMLElement>document.getElementById('tHeadRowsMin');
      element.classList.remove('tHeadRowsMin');
      element.classList.add('tHeadRowsMax');
    }
  }

  public click(obj, action) {
    console.log(obj);
    console.log('DataTbale Here:--->', action);
    this.clickMethod.emit({ obj, action });
  }

  public search() {
    var result = [];
    var totalResultFilter = [];

    if(this.listComplete.length == 0) this.listComplete = this.list;

    if (this.searchTable) {
      this.arraySearch.forEach(element => {
        result = _.filter(this.list, row => row[element].toLowerCase().indexOf(this.searchTable.toLowerCase()) > -1);

        if (result.length > 0) {
          result.forEach(elementObject => {
            if (totalResultFilter.indexOf(elementObject) === -1) {
              totalResultFilter.push(elementObject);
            }
          });
          result = [];
        }
      });
      
      this.list = totalResultFilter;
    } else this.list = this.listComplete;
  }

}
