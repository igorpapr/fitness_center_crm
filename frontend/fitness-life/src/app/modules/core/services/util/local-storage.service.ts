import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly LOCAL_STORAGE_JWT_KEY = 'token';

  constructor() { }

  public getJwt(): string | null {
    return localStorage.getItem(this.LOCAL_STORAGE_JWT_KEY)
  }

  public setJwt(jwt: string): void {
    localStorage.setItem(this.LOCAL_STORAGE_JWT_KEY, jwt);
  }

  public removeJwt(): void {
    localStorage.removeItem(this.LOCAL_STORAGE_JWT_KEY);
  }
}
