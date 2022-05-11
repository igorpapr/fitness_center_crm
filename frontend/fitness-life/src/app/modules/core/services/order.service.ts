import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {HandleErrorsService} from "./util/handle-errors.service";
import {Observable} from "rxjs";
import {Page} from "../model/page";
import {Order} from "../model/order";
import {Customer} from "../model/customer";
import {OrderDto} from "../model/dto/order-dto";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private ORDER_URL = `${environment.apiUrl_v1}order`
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient,
              private handleErrorsService: HandleErrorsService) {
  }

  public getAllOrdersByService(pageNumber: number,
                               pageSize: number,
                               serviceId: number): Observable<Page<Order>> {
    const requestParams: HttpParams = new HttpParams()
      .set('page', String(pageNumber))
      .set('size', String(pageSize))
      .set('serviceId', String(serviceId));

    return this.http.get<Page<Order>>(this.ORDER_URL + '/by_service', {
      headers: this.httpOptions.headers,
      params: requestParams
    });
  }

  public getAllOrdersByCustomer(pageNumber: number,
                                pageSize: number,
                                customerId: number): Observable<Page<Order>> {
    const requestParams: HttpParams = new HttpParams()
      .set('page', String(pageNumber))
      .set('size', String(pageSize))
      .set('customerId', String(customerId));

    return this.http.get<Page<Order>>(this.ORDER_URL + '/by_customer', {
      headers: this.httpOptions.headers,
      params: requestParams
    });
  }

  public createOrder(orderDto: OrderDto) {
    console.log('Trying to create order: ' + orderDto);
    return this.http.post<Customer>(this.ORDER_URL, orderDto, this.httpOptions);
  }
}
