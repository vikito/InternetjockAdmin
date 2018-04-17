import { Component, NgModule, Input, Output, AfterViewInit, ElementRef, EventEmitter, OnChanges, enableProdMode } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PreloadService } from './smart/services/preload/preload.service';

@Component({
  selector    : 'app-root',
  templateUrl : './app.component.html',
  styleUrls   : ['./app.component.css'],
  providers   : [PreloadService]
})
export class AppComponent {
  title = 'app';
  public isLogin : boolean = true;
  public pageTitle : string;
  public datas = [
                  {
                    "nameGroup" : "Alaskan/Hawaiian Time Zone",
                    "datas" : [
                      { "value" : "AK", "text" : "Alaska" },
                      { "value" : "HI", "text" : "Hawaii" }
                    ]
                  },
                  {
                    "nameGroup" : "Pacific Time Zone",
                    "datas" : [
                      { "value" : "CA", "text" : "California" },
                      { "value" : "NV", "text" : "Nevada" },
                      { "value" : "OR", "text" : "Oregon" },
                      { "value" : "WA", "text" : "Washington" }
                    ]
                  },
                  {
                    "nameGroup" : "Mountain Time Zone",
                    "datas" : [
                      { "value" : "AZ", "text" : "Arizona" },
                      { "value" : "CO", "text" : "Colorado" },
                      { "value" : "ID", "text" : "Idaho" },
                      { "value" : "MT", "text" : "Montana" },
                      { "value" : "NE", "text" : "Nebraska" },
                      { "value" : "NM", "text" : "New Mexico" },
                      { "value" : "ND", "text" : "North Dakota" },
                      { "value" : "UT", "text" : "Utah" },
                      { "value" : "WY", "text" : "Wyoming" }
                    ]
                  },
                  {
                    "nameGroup" : "Central Time Zone",
                    "datas" : [
                      { "value" : "AL", "text" : "Alabama" },
                      { "value" : "AR", "text" : "Arkansas" },
                      { "value" : "IL", "text" : "Illinois" },
                      { "value" : "IA", "text" : "Iowa" },
                      { "value" : "KS", "text" : "Kansas" },
                      { "value" : "KY", "text" : "Kentucky" },
                      { "value" : "LA", "text" : "Louisiana" },
                      { "value" : "MN", "text" : "Minnesota" },
                      { "value" : "MS", "text" : "Mississippi" },
                      { "value" : "MO", "text" : "Missouri" },
                      { "value" : "OK", "text" : "Oklahoma" },
                      { "value" : "SD", "text" : "South Dakota" },
                      { "value" : "TX", "text" : "Texas" },
                      { "value" : "TN", "text" : "Tennessee" },
                      { "value" : "WI", "text" : "Wisconsin" }
                    ]
                  },
                  {
                    "nameGroup" : "Eastern Time Zone",
                    "datas" : [
                      { "value" : "CT", "text" : "Connecticut" },
                      { "value" : "DE", "text" : "Delaware" },
                      { "value" : "FL", "text" : "Florida" },
                      { "value" : "GA", "text" : "Georgia" },
                      { "value" : "IN", "text" : "Indiana" },
                      { "value" : "ME", "text" : "Maine" },
                      { "value" : "MD", "text" : "Maryland" },
                      { "value" : "MA", "text" : "Massachusetts" },
                      { "value" : "MI", "text" : "Michigan" },
                      { "value" : "NH", "text" : "New Hampshire" },
                      { "value" : "NJ", "text" : "New Jersey" },
                      { "value" : "NY", "text" : "New York" },
                      { "value" : "NC", "text" : "North Carolina" },
                      { "value" : "OH", "text" : "Ohio" },
                      { "value" : "PA", "text" : "Pennsylvania" },
                      { "value" : "RI", "text" : "Rhode Island" },
                      { "value" : "SC", "text" : "South Carolina" },
                      { "value" : "VT", "text" : "Vermont" },
                      { "value" : "VA", "text" : "Virginia" },
                      { "value" : "WV", "text" : "West Virginia" }
                    ]
                  }
                ];
  
  constructor(
      private preload: PreloadService,
      private _router: Router
    ) {
    this.isLogin = (localStorage.getItem('Session.User') === null) ? false : true;      
    this.pageTitle = 'Users';
    this.preload.getSystem();
  }

  ngOnInit() {
    if(this.isLogin) {
      this._router.navigate(['/dashboard']);
    } else {
      this._router.navigate(['/']);
    }
  }
}
