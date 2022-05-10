import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {HandleErrorsService} from "../util/handle-errors.service";
import {LocalStorageService} from "../util/local-storage.service";
import {map} from "rxjs/operators";
import {UserData} from "../../model/user-data";
import {AuthenticationRequestDto} from "../../model/dto/authentication-request";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserDataSubject: BehaviorSubject<UserData>;
  public currentUserData: Observable<UserData>;

  private readonly AUTHENTICATE_URL = `${environment.apiUrl_v1}auth/authenticate`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      observe: 'response'
    })
  };

  constructor(private http: HttpClient,
              private handleErrorsService: HandleErrorsService,
              private localStorageService: LocalStorageService) {

    this.currentUserDataSubject = new BehaviorSubject<UserData>(
      // @ts-ignore
      this.localStorageService.getJwt()
        // @ts-ignore
        ? jwt_decode(this.localStorageService.getJwt())
        : undefined);
    this.currentUserData = this.currentUserDataSubject.asObservable();
  }

  public get currentUserValue(): UserData {
    return this.currentUserDataSubject.value;
  }

  public isAuthenticated(): boolean {
    return !!this.currentUserDataSubject.value;
  }

  /**
   * Authenticating user
   * @returns a UserData observable
   * @param authRequest
   */
  public authenticateUser(authRequest: AuthenticationRequestDto): Observable<UserData> {
    //TODO - password hashing
    return this.http.post<UserData>(
      this.AUTHENTICATE_URL,
      authRequest,
      this.httpOptions)
      .pipe(map(data => {
          const jsonResponse: any = data;
          this.localStorageService.setJwt(jsonResponse.jwt);
          // @ts-ignore
          const decodedUserData: UserData = jwt_decode(jsonResponse.jwt);
          this.currentUserDataSubject.next(decodedUserData);
          //this.localeService.initUserLang(this.settingsService.getLanguage());
          return decodedUserData;
        })
      );
  }

  /**
   * Logs out the current user
   * (also deletes jwt token and cart data from local storage)
   */
  public logOut(): void {
    this.localStorageService.removeJwt();
    // @ts-ignore
    this.currentUserDataSubject.next(null);
  }
}
