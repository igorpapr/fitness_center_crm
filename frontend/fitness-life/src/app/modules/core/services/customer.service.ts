import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {HandleErrorsService} from "./util/handle-errors.service";
import {Observable} from "rxjs";
import {Page} from "../model/page";
import {Customer} from "../model/customer";
import {CustomerDto} from "../model/dto/customer-dto";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private CUSTOMER_URL = `${environment.apiUrl_v1}customer`
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient,
              private handleErrorsService: HandleErrorsService) { }

  public getAllCustomersList(pageNumber: number,
                             pageSize: number): Observable<Page<Customer>> {
    const requestParams: HttpParams = new HttpParams()
      .set('page', String(pageNumber))
      .set('size', String(pageSize));

    return this.http.get<Page<Customer>>(this.CUSTOMER_URL, {
      headers: this.httpOptions.headers,
      params: requestParams});
  }

  public createCustomer(customerDto: CustomerDto) {
    console.log('Trying to create customer: ' + customerDto);
    return this.http.post<Customer>(this.CUSTOMER_URL, customerDto, this.httpOptions);
  }
}
