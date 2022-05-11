import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {HandleErrorsService} from "./util/handle-errors.service";
import {Observable} from "rxjs";
import {Page} from "../model/page";
import {Visitation} from "../model/visitation";
import {OrderDto} from "../model/dto/order-dto";
import {Customer} from "../model/customer";
import {VisitationDto} from "../model/dto/visitation-dto";

@Injectable({
  providedIn: 'root'
})
export class VisitationService {

  private VISITATION_URL = `${environment.apiUrl_v1}visitation`
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient,
              private handleErrorsService: HandleErrorsService) { }

  public getAllVisitationsListByCustomer(pageNumber: number,
                                         pageSize: number,
                                         customerId: number): Observable<Page<Visitation>> {
    const requestParams: HttpParams = new HttpParams()
      .set('page', String(pageNumber))
      .set('size', String(pageSize))
      .set('customerId', String(customerId));

    return this.http.get<Page<Visitation>>(this.VISITATION_URL, {
      headers: this.httpOptions.headers,
      params: requestParams});
  }

  public createVisitation(visitationDto: VisitationDto) {
    console.log('Trying to create visitation: ' + visitationDto);
    return this.http.post<Customer>(this.VISITATION_URL, visitationDto, this.httpOptions);
  }
}
