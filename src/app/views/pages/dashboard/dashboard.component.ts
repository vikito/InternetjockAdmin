import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';

@Component({
    selector    : 'dashboard-page',
    templateUrl : './dashboard.component.html',
    styleUrls   : ['./dashboard.component.css']
})
export class DashboardComponent {
    private baseUrl: string = environment.TENPLATE_API_URL;
    private headers = new Headers();
    private options = new RequestOptions();
    private sessionUser;
    public title = 'Dashboard';

    private openIssuesList : any[];
    public rowsOnPagePaginatorIssues = 10;
    private loading = true;
    public totalRowsIssues;
    private widthDatatableIssues: string;
    private heightDatatableIssues: string;
    private columnsIssues = [
        {
            Header: 'Subject',
            Field: 'subject',
            IsField: 'field',
            ColumnWidth: '',
            ColumnDisplay: true,
            ColumnFormat: '',
            ColumnFixed: false // si es false la columna crece si true no crece 
        },
        {
            Header: 'Status',
            Field: 'status',
            IsField: 'field',
            ColumnWidth: '',
            ColumnDisplay: true,
            ColumnFormat: '',
            ColumnFixed: true
        },
        {
            Header: 'Reported By',
            Field: 'reportedBy',
            IsField: 'field',
            ColumnWidth: '',
            ColumnDisplay: true,
            ColumnFormat: '',
            ColumnFixed: false
        },
        {
            Header: 'Created',
            Field: 'created',
            IsField: 'field',
            ColumnWidth:'',
            ColumnDisplay: true,
            ColumnFormat: 'DateTime',
            ColumnFixed: true
        },
        {
            Header: 'Detail',
            Field: 'Detail',
            IsField: 'action',
            ColumnWidth: '8%',
            IconLink: 'fa fa-pencil fa-fw',
            Action: 'detail',
            ColumnFixed: true
        }
    ];
    
    private openOrdersList : any[];
    public filterQueryOrders = '';
    public rowsOnPagePaginatorOrders = 10;
    public totalRowsOrders;
    private widthDatatableOrders: string;
    private heightDatatableOrders: string;
    private columnsOrders = [
        {
            Header: 'Number',
            Field: 'number',
            IsField: 'field',
            ColumnWidth: '',
            ColumnDisplay: true,
            ColumnFormat: '',
            ColumnFixed: false // si es false la columna crece si true no crece 
        },
        {
            Header: 'Producer',
            Field: 'producer',
            IsField: 'field',
            ColumnWidth: '',
            ColumnDisplay: true,
            ColumnFormat: '',
            ColumnFixed: true
        },
        {
            Header: 'Created',
            Field: 'created',
            IsField: 'field',
            ColumnWidth: '',
            ColumnDisplay: true,
            ColumnFormat: 'DateTime',
            ColumnFixed: false
        },
        {
            Header: 'Status',
            Field: 'status',
            IsField: 'field',
            ColumnWidth:'',
            ColumnDisplay: true,
            ColumnFormat: '',
            ColumnFixed: true
        },
        {
            Header: 'Deadline',
            Field: 'deadline',
            IsField: 'field',
            ColumnWidth:'',
            ColumnDisplay: true,
            ColumnFormat: '',
            ColumnFixed: true
        },
        {
            Header: 'Detail',
            Field: 'Detail',
            IsField: 'action',
            ColumnWidth: '8%',
            IconLink: 'fa fa-pencil fa-fw',
            Action: 'detail',
            ColumnFixed: true
        }
    ];

    private unpaidInvoicesList : any[];
    public filterQueryInvoices = '';
    public rowsOnPagePaginatorInvoices = 10;
    public totalRowsInvoices;
    private widthDatatableInvoices: string;
    private heightDatatableInvoices: string;
    private columnsInvoices = [
        {
            Header: 'Number',
            Field: 'number',
            IsField: 'field',
            ColumnWidth: '',
            ColumnDisplay: true,
            ColumnFormat: '',
            ColumnFixed: false // si es false la columna crece si true no crece 
        },
        {
            Header: 'Account',
            Field: 'Account',
            IsField: 'field',
            ColumnWidth: '',
            ColumnDisplay: true,
            ColumnFormat: '',
            ColumnFixed: true
        },
        {
            Header: 'Due Date',
            Field: 'paymentDueDate',
            IsField: 'field',
            ColumnWidth: '',
            ColumnDisplay: true,
            ColumnFormat: 'Date',
            ColumnFixed: false
        },
        {
            Header: 'Subtotal',
            Field: 'subtotal',
            IsField: 'field',
            ColumnWidth:'',
            ColumnDisplay: true,
            ColumnFormat: 'Currency',
            NumDecimal: 2,
            ColumnFixed: true
        },
        {
            Header: 'Detail',
            Field: 'Detail',
            IsField: 'action',
            ColumnWidth: '8%',
            IconLink: 'fa fa-pencil fa-fw',
            Action: 'detail',
            ColumnFixed: true
        }
    ];
    
    constructor(
        private _http: Http,
        private _router: Router
    ) {
        this.sessionUser = JSON.parse(localStorage.getItem('Session.User'));
        this.headers = new Headers({ 'Content-Type' : 'application/json', 'api_key': this.sessionUser.AccessToken });
        this.options = new RequestOptions({headers: this.headers});
    }

    ngOnInit() {
        this.getOpenIssuesList();
        this.getOpenOrdersList();
        this.getUnpaidInvoicesList();
    }

    getOpenIssues() {
        var body = {
        //"nrecords" : 30,
        // "npage" : 1
        }
        this.options = new RequestOptions({headers: this.headers});
        return this._http.post(this.baseUrl + 'Data/dbo/Dashboard_ISSUE_GetList', body, {headers: this.headers})
                        .map((response: Response) => response.json())
                        .catch(this.errorHandler);
    }

    public getOpenIssuesList() {
        this.getOpenIssues().subscribe((openIssuesList) => {
            this.openIssuesList = openIssuesList;

            if( this.openIssuesList.hasOwnProperty('status') ) {
                if(this.openIssuesList['status'] == 'Unauthorized') {
                    localStorage.removeItem('Session.User');
                    this._router.navigate(['/']);
                    location.reload();
                }
            }
            
            this.totalRowsIssues = this.openIssuesList[0].RecordCount;
            this.loading = false;
        }, (error) => {
            console.log(error);
        })
    }

    getOpenOrders() {
        var body = {
        // "nrecords" : 10,
        // "npage" : 1
        }
        this.options = new RequestOptions({headers: this.headers});
        return this._http.post(this.baseUrl + 'Data/dbo/Dashboard_ORDER_GetList', body, {headers: this.headers})
                        .map((response: Response) => response.json())
                        .catch(this.errorHandler);
    }

    public getOpenOrdersList() {
        this.getOpenOrders().subscribe((openOrdersList) => {
            this.openOrdersList = openOrdersList;

            if( this.openOrdersList.hasOwnProperty('status') ) {
                if(this.openOrdersList['status'] == 'Unauthorized') {
                    localStorage.removeItem('Session.User');
                    this._router.navigate(['/']);
                    location.reload();
                }
            }

            this.totalRowsOrders = this.openOrdersList[0].RecordCount;
            this.loading = false;
        }, (error) => {
            console.log(error);
        })
    }

    getUnpaidInvoices() {
        var body = {
        // "nrecords" : 10,
        // "npage" : 1
        }
        this.options = new RequestOptions({headers: this.headers});
        return this._http.post(this.baseUrl + 'Data/dbo/Dashboard_UNPAID_INVOICE_GetList', body, {headers: this.headers})
                        .map((response: Response) => response.json())
                        .catch(this.errorHandler);
    }

    public getUnpaidInvoicesList() {
        this.getUnpaidInvoices().subscribe((unpaidInvoicesList) => {
            this.unpaidInvoicesList = unpaidInvoicesList;

            if( this.unpaidInvoicesList.hasOwnProperty('status') ) {
                if(this.unpaidInvoicesList['status'] == 'Unauthorized') {
                    localStorage.removeItem('Session.User');
                    this._router.navigate(['/']);
                    location.reload();
                }
            }

            this.totalRowsInvoices = this.unpaidInvoicesList[0].RecordCount;
            this.loading = false;
        }, (error) => {
            console.log(error);
        })
    }

    errorHandler(error: Response) {
        return Observable.throw(error || 'SERVER ERROR');
    }

    clickIssues(e){}

    clickOrders(e){}

    clickInvoices(e){}
}