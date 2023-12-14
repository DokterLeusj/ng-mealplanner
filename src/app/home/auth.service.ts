import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly BASE_API_URL: string = 'http://localhost:8080/api/v1';
  private readonly AUTH_URL: string = this.BASE_API_URL + '/auth';
  private user: any;

  constructor(private httpClient: HttpClient) { }

  sendLoginRequest(email: string, password: string): Observable<any>{
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
    this.user = loggedInUser
  }

  logout(): void{
    // Unset the user
    this.user = undefined;
    // Remove the user from local storage
    localStorage.removeItem('loggedInUser')
  }

  getLoggedInUser(){
    const storedUser = localStorage.getItem('loggedInUser')
    if(!storedUser){
      throw new Error('Not logged in');
    }
    this.user = JSON.parse(storedUser);
    return this.user
  }

  isLoggedIn(): boolean{
    try {
      this.getLoggedInUser();
      return true;
    } catch (e) {
      return false;
    }
  }
  getUsername(): string{
    return this.getLoggedInUser().email;
  }
}
