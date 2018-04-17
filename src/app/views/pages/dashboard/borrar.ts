import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFilter'
})
export class DataFilterPipeUser implements PipeTransform {
  private nameField = '';
  public arrayFieldName = ['UserName', 'IsLocked', 'ListOfRoles', 'SystemsList', 'LastPageUrl'];
  private resultFilter = [];
  private totalResultFilter = [];

  public set ArrayFieldName(arrayFieldName: any[]) {
    this.arrayFieldName = arrayFieldName;
  }
  transform(array: any[], query: string, data: string): any {
    this.totalResultFilter = [];
    if (query) {
      this.arrayFieldName.forEach(element => {
        this.resultFilter = _.filter(array, row => row[element].toLowerCase().indexOf(query.toLowerCase()) > -1);
        if (this.resultFilter.length > 0) {
          this.resultFilter.forEach(elementObject => {
            if (this.totalResultFilter.indexOf(elementObject) === -1) {
              this.totalResultFilter.push(elementObject);
            }
          });
          this.resultFilter = [];
        }
      });
      console.log('totalResultFilter[]:-->', this.totalResultFilter);
      return this.totalResultFilter;
    }
    return array;
  }

}
