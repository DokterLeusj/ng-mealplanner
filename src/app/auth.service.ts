import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of, switchMap, throwError} from "rxjs";
import {AuthUser} from "./user/model/auth-user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly BASE_API_URL: string = 'http://localhost:8080/api/v1';
  private readonly AUTH_URL: string = this.BASE_API_URL + '/auth';
  private loggedInAuthUser: AuthUser | null = null;

  constructor(private httpClient: HttpClient) {
  }

  public getLoggedInAuthUser(): AuthUser {
    if (this.loggedInAuthUser == null) {
      try {
        this.loggedInAuthUser = this.getLoggedInAuthUserFromLocalStorage();
      } catch (e) {
        throw e;
      }
    }
    return this.loggedInAuthUser;
  }

  public logOut(): void {
    this.loggedInAuthUser = null;
    localStorage.removeItem('loggedInAuthUser');
  }

  public attemptLogin(email: string, password: string): Observable<any> {
    return this.sendLoginRequest(email, password)
      .pipe(
        map(response => {
          this.setLoggedInAuthUserInLocalStorage(response.id, email, password);
          return response;
        })
        ,
        catchError(e => {
          console.error("Invalid credentials", e);
          throw e;
        })
      )
  }

  // public attemptLogin(email: string, password: string) {
  //     this.sendLoginRequest(email, password)
  //         .pipe(
  //             catchError(e => {
  //                 console.error("Invalid credentials", e);
  //                 throw e;
  //             })
  //         )
  //         .subscribe(
  //             response => {
  //                 this.setLoggedInAuthUserInLocalStorage(response.id, email, password);
  //             });
  //
  // }

  public attemptRegister(email: string, password: string): Observable<any> {
    return this.sendRegisterRequest(email, password)
      .pipe(
        map(() => {
          const successMessage: string = 'Successfully registered. you can now log in as ' + email
          return of(successMessage).pipe(
            switchMap(() => this.attemptLogin(email, password)))
        }),
        catchError((error) => {
          console.error('Registration failed', error);
          return throwError(() => new Error('Registration failed'));
        })
      )
  };


  private getAuthToken(email: string, password: string): string {
    return window.btoa(email + ':' + password);
  }

  private setLoggedInAuthUserInLocalStorage(id: string, email: string, password: string) {
    const authToken: string = this.getAuthToken(email, password)
    this.loggedInAuthUser = {
      "id": id,
      "basicAuthToken": authToken
    }
    localStorage.setItem('loggedInAuthUser', JSON.stringify(this.loggedInAuthUser));
  }

  private getLoggedInAuthUserFromLocalStorage(): AuthUser {
    const storedUser = localStorage.getItem('loggedInAuthUser');
    if (!storedUser) {
      throw new Error('No logged in user stored');
    }
    return JSON.parse(storedUser);
  }

  private sendLoginRequest(email: string, password: string): Observable<any> {
    return this.httpClient.post(this.AUTH_URL + '/login',
      {"email": email, "password": password});
  }

  private sendRegisterRequest(email: string, password: string): Observable<any> {
    return this.httpClient.post<string>(this.AUTH_URL + '/register',
      {"email": email, "password": password});
  }
}
