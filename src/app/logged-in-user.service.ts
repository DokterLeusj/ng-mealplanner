import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {UserListDto} from "./user/model/dto/user-list-dto";
import {UserService} from "./user.service";
import {AuthUser} from "./user/model/auth-user";
import {catchError, Observable, of} from "rxjs";
import {UserPlanDto} from "./user/model/dto/user-plan-dto";

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
            this.loggedInAuthUser =null;
        }
        if(this.loggedInAuthUser!=null){
            this.setLoggedInUserDetailsFromId(this.loggedInAuthUser.id);
        }
    }

    public getLoggedInUser(): UserListDto | null {
        if(this.loggedInAuthUser==null){
            try{
                this.loggedInAuthUser=this.authService.getLoggedInAuthUser();
            }catch (e) {
                return null;
            }
        }
             if(!this.loggedInAuthUser===null&&this.loggedInUser==null){

            this.setLoggedInUserDetailsFromId(this.loggedInAuthUser.id);
        }
        return this.loggedInUser;
    }
public getLoggedInUserPlanSettings():Observable<UserPlanDto>{
       const user:UserListDto|null=this.getLoggedInUser();
        if(user==null){
            throw new Error("No logged in user!")
        }else{
            return this.userService.getUserPlanSettingsById(user.id);
        }
}
    public logOut(): boolean {
        this.loggedInUser = null;
        this.authService.logOut();
        return this.getLoggedInUser() == null;
    }

    public isLoggedIn(): boolean {
        return this.getLoggedInUser()!= null;
    }

    private setLoggedInUserDetailsFromId(id:string) {
        this.userService.getUserListById(id)
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
