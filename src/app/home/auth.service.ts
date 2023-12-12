import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly BASE_API_URL: string = 'http://localhost:8080/api/v1';
  private readonly AUTH_URL: string = this.BASE_API_URL + '/auth';

  constructor(private httpClient: HttpClient) { }

  sendLoginRequest(email: string | null | undefined, password: string | null | undefined): Observable<any>{
    return this.httpClient.post(this.AUTH_URL + '/login',
      {"email": email, "password": password})
  }

  saveCredentialsLocally(email: string | null, password: string | null){
    const authToken: string = window.btoa(email + ':' + password);
    const loggedInUser = {
      "email": email,
      "basicAuthToken": authToken
    }
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
  }

}
