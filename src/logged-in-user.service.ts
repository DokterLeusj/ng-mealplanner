import {Injectable} from '@angular/core';
import {AuthService} from "./app/auth.service";
import {UserListDto} from "./app/user/model/dto/user-list-dto";
import {UserService} from "./app/user.service";
import {AuthUser} from "./app/user/model/auth-user";
import {catchError, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoggedInUserService {
    loggedInAuthUser: AuthUser | null = null;
    loggedInUser: UserListDto | null = null;

    constructor(private authService: AuthService, private userService: UserService) {
        try{
            this.loggedInAuthUser = authService.getLoggedInAuthUser();
        }catch(e){
            console.log("No user stored")
            this.loggedInAuthUser =null;
        }
        if(this.loggedInAuthUser!=null){
            this.setLoggedInUserDetailsFromId(this.loggedInAuthUser.id);
        }
    }

    public getLoggedInUser(): UserListDto | null {
        if(this.loggedInAuthUser!=null&&this.loggedInUser==null){
            this.setLoggedInUserDetailsFromId(this.loggedInAuthUser.id);
        }
        return this.loggedInUser;
    }

    public logOut(): boolean {
        this.loggedInUser = null;
        this.authService.logOut();
        return this.getLoggedInUser() == null;
    }

    public isLoggedIn(): boolean {
        return !this.getLoggedInUser()== null;
    }

    private setLoggedInUserDetailsFromId(id:string) {
        this.userService.getUserDetailById(id)
            .pipe(
                catchError(e => {
                    console.error("Could not get user details", e);
                    return of(null);
                })
            )
            .subscribe(
                response => this.loggedInUser = response
            );
    }
}
