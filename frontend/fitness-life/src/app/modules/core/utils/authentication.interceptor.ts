import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../../environments/environment";
import {UserData} from "../model/user-data";
import {AuthenticationService} from "../services/auth/authentication.service";
import {LocalStorageService} from "../services/util/local-storage.service";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService,
              private localStorageService: LocalStorageService) {
  }

  /**
   * Adds current user's jwt to the headers of the outgoing request to backend api
   * @param request HttpRequest
   * @param next HttpHandler
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const currentUser: UserData = this.authenticationService.currentUserValue;
    const isApiUrl: boolean = request.url.startsWith(environment.apiUrl_v1);

    if ((currentUser) && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.localStorageService.getJwt()}`
        }
      });
    }
    return next.handle(request);
  }
}
