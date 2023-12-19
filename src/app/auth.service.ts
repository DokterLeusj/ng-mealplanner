import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
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
            }catch (e) {
                throw e;
            }
        }
        return this.loggedInAuthUser;
    }

    public logOut(): void {
        this.loggedInAuthUser = null;
        localStorage.removeItem('loggedInAuthUser');
    }

    public attemptLogin(email: string, password: string): boolean {
        try {
            this.sendLoginRequest(email, password)
                .subscribe(
                    response => {
                        this.setLoggedInAuthUserInLocalStorage(response.id, email, password);
                    });
            return true;
        } catch (error) {
            return false;
        }
    }

    public attemptRegister(email: string, password: string): boolean {
        return false;
        // if email already registered, display error message
        // if email not registered yet, display registration successful & go to Home
    }

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
            {"email": email, "password": password})
            .pipe(catchError((error: HttpErrorResponse) => {
                    throw error;
                })
            );
    }
}
