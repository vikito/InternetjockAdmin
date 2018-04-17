import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AppComponent } from '../../../app.component';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class LoginService {
  private username: string;
  private password: string;
  private login;
  private user;
  private acces: Boolean = false;
  private SessionUser;
 

  private params: string;
  private SessionSystem;
  private system;
  private SystemsId;
  public SystemInfo;
  private UserId;
  private mainMenu: any[];
  private subMenu: any[];
  private menu: any;
  private reloadi = 0;
 
  public sessionMenu;
  public loading: string;
  public validAccess: Boolean = false;
  public arrayMainMenu = new Array();
  private logo;

  private autenticateOk = false;
  private API_URL: string = environment.TENPLATE_API_URL;
  private headers = new Headers({ 'Content-Type' : 'application/json', 'api_key': environment.TEMPLATE_API_KEY });
  private options = new RequestOptions({headers: this.headers});
  private urlQuery: string;
  
  constructor(
    private _http: Http
  ) {
    this.loading = 'true';
    localStorage.setItem('loading', this.loading);
  }

  errorHandler(error: Response) {
    return Observable.throw(error || 'SERVER ERROR');
  }
  
  authenticate(username, password) : Observable<any> {
    this.urlQuery = this.API_URL + 'Authenticate?UserName=' + username + '&Password=' + password;
    return this._http.get(this.urlQuery, this.options)
                    .map((response: Response) => this.getLogin(response.json()))
                    .catch(this.errorHandler);
  }

  getLogin(response) {
    var sw = false;
    this.login = response;

    if (this.login.IsAuthenticated !== '0') {
      var user = {
        "UsersId":this.login.UsersId,
        "SystemsList":this.login.SystemsList,
        "AccessToken":this.login.AccessToken,
        "UserName":this.login.UserName,
        "FirstName":this.login.FirstName,
        "LastName":this.login.LastName,
        "Email":this.login.Email,
        "Phone":this.login.Phone,
        "Title":this.login.Title,
        "ListOfRoles":this.login.ListOfRoles,
        "ListOfRolesId":this.login.ListOfRolesId,
        "IsUserChildren":this.login.IsUserChildren,
        "IsLocked":this.login.IsLocked
      }
      environment.TEMPLATE_API_KEY = this.login.AccessToken;
      localStorage.setItem('Session.User', JSON.stringify(user));
      this.SessionUser = JSON.parse(localStorage.getItem('Session.User'));
      var system = JSON.parse(localStorage.getItem('Session.System'));
      var params = '?systemsId=20&usersId=' + user.UsersId;
      
      this.getMenu(params).subscribe((menu) => {
      }, (error) => {
        console.log(error);
      });

      sw = true;
    }

    return sw;
  }

  getMenu( params: string ) {
    this.headers = new Headers({ 'Content-Type' : 'application/json', 'api_key': environment.TEMPLATE_API_KEY });
    this.options = new RequestOptions({headers: this.headers});
    var urlQuery = this.API_URL + 'Menu/ListMainMenus' + params;
    
    return this._http.get(urlQuery, this.options)
                    .map((response: Response) => this.getMainMenus(response.json()))
                    .catch(this.errorHandler);
  }

  getSubMenu(idMainMenu: Number, params: string) {
    var urlQuery = this.API_URL + 'Menu/ListChildMenus/' + idMainMenu + params;
    return this._http.get(urlQuery , this.options)
                    .map((response: Response) => response.json())
                    .catch(this.errorHandler);
  }

  getMainMenus(response) {
    this.mainMenu = response;    
    var arrayMenu = Array();
    var params = '?systemsId=' + this.SystemsId + '&usersId=' + this.UserId;
    
    for (const _mainMenu_i of this.mainMenu) {
        var MainMenu = _mainMenu_i;
        
        this.getSubMenu(MainMenu['MenuId'], params).subscribe((subMenu) => {
          this.subMenu = subMenu;
          MainMenu.SubMenu =  this.subMenu;
          this.arrayMainMenu.push(MainMenu);
          arrayMenu.push(MainMenu);
          localStorage.setItem('Session.Menus', JSON.stringify(this.arrayMainMenu));
        }, (error) => {
          console.log(error);
        })
    }
    
    if (!this.mainMenu) {
      console.log('Error in this server');
    } else {
      localStorage.setItem('loading', 'false');
    }

    return arrayMenu;
  }
}
