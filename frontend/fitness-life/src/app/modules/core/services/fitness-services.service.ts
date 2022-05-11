import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {HandleErrorsService} from "./util/handle-errors.service";
import {Observable} from "rxjs";
import {Service} from "../model/service";
import {Page} from "../model/page";
import {environment} from "../../../../environments/environment";
import {CustomerDto} from "../model/dto/customer-dto";
import {Customer} from "../model/customer";
import {ServiceDto} from "../model/dto/service-dto";

@Injectable({
  providedIn: 'root'
})
export class FitnessServicesService {

  private SERVICES_URL = `${environment.apiUrl_v1}service`
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient,
              private handleErrorsService: HandleErrorsService) { }

  public getAllServicesList(pageNumber: number,
                            pageSize: number): Observable<Page<Service>> {
    const requestParams: HttpParams = new HttpParams()
      .set('page', String(pageNumber))
      .set('size', String(pageSize));

    return this.http.get<Page<Service>>(this.SERVICES_URL, {
      headers: this.httpOptions.headers,
      params: requestParams});
  }

  public createService(serviceDto: ServiceDto) {
    console.log('Trying to create service: ' + serviceDto);
    return this.http.post<Customer>(this.SERVICES_URL, serviceDto, this.httpOptions);
  }
}
