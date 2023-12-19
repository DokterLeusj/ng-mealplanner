import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {RecipesFilter} from "./recipe/model/recipes-filter";
import {UserListDto} from "./user/model/dto/user-list-dto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly BASE_API_URL: string = 'http://localhost:8080/api/v1';
  private readonly AUTH_URL: string = this.BASE_API_URL + '/auth';
  private loggedInUser: any;

  constructor(private httpClient: HttpClient) {
  }

  sendLoginRequest(email: string, password: string): Observable<any> {
    return this.httpClient.post(this.AUTH_URL + '/login',
      {"email": email, "password": password})
      .pipe(catchError((error: HttpErrorResponse) => {
          throw error;
        })
      );
  }

  saveLoggedInUserLocally(id: string, email: string, password: string) {
    const authToken: string = window.btoa(email + ':' + password);
    const loggedInUserForStorage = {
      "id": id,
      "basicAuthToken": authToken
    }
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUserForStorage));
    this.loggedInUser = loggedInUserForStorage;
  }

  logOut(): void {
    // Unset the loggedInUser
    this.loggedInUser = undefined;
    // Remove the loggedInUser from local storage
    localStorage.removeItem('loggedInUser')
  }

  setLoggedInUserFromStorage() {
    const storedUser = localStorage.getItem('loggedInUser');
    if (!storedUser) {
      throw new Error('Not logged in');
    }
    this.loggedInUser = JSON.parse(storedUser);
  }

  getLoggedInUser(): UserListDto {
    if (this.loggedInUser == null) {
      this.setLoggedInUserFromStorage();
    }
    return this.loggedInUser;
  }

  isLoggedIn(): boolean {
    try {
      this.getLoggedInUser();
      return true;
    } catch (e) {
      return false;
    }
  }

  getUsername(): string | null {
    try {
      return this.getLoggedInUser().username;
    } catch (e) {
      return null;
    }
  }

  attemptLogin(email: string, password: string): boolean {
    try {
      this.sendLoginRequest(email, password)
        .subscribe(
          response => {
            this.saveLoggedInUserLocally(response.id, email, password);
          });
      return true;
    } catch (error) {
      return false;
    }

  }

  attemptRegister(email: string, password: string): boolean {
    return false;
    // if email already registered, display error message
    // if email not registered yet, display registration successful & go to Home
  }
}
