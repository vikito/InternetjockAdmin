import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class PreloadService {
  private SessionSystem;
  private system;
  private SystemsId;
  public SystemInfo;

  private baseUrl: string = environment.TENPLATE_API_URL;
  private headers = new Headers({ 'Content-Type' : 'application/json', 'api_key': environment.TEMPLATE_API_KEY });
  private options = new RequestOptions({headers: this.headers});

  constructor(
    private _http: Http,
    private titleService: Title
  ) {

  }

  /** System */
  errorHandler(error: Response) {
    return Observable.throw(error || 'SERVER ERROR');
  }

  private getSystemInfo() {
    this.headers.set('api_key', environment.TEMPLATE_API_KEY);
    
    return this._http.get(this.baseUrl + 'GetSystemInfo', this.options)
                    .map(response => response.json())
                    .catch(this.errorHandler);
  }

  public getSystem() {
    this.getSystemInfo().subscribe((system) => {
      this.system = system;
      this.SystemsId = system.systemsId;
      localStorage.setItem('Session.System', JSON.stringify(this.system));
      this.SessionSystem = JSON.parse(localStorage.getItem('Session.System'));
      this.titleService.setTitle( this.system.BrowserTitle );
    }, (error) => {
      console.log(error);
    });
  }
}