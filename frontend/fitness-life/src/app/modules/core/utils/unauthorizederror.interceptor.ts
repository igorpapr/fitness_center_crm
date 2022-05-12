import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import {AuthenticationService} from "../services/auth/authentication.service";

@Injectable()
export class UnauthorizederrorInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(catchError(err => {
        if ([401].indexOf(err.status) !== -1) {
          this.authenticationService.logOut();
          // location.replace('/');
        }

        return throwError(err);
      }));
  }
}
