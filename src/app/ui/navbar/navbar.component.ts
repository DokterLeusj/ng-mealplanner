import {Component} from '@angular/core';
import {RouterLink, RouterModule} from "@angular/router";
import {CommonModule, NgForOf} from "@angular/common";
import {AuthService} from "../../auth.service";
import {UserListDto} from "../../user/model/dto/user-list-dto";
import {LoggedInUserService} from "../../../logged-in-user.service";

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterLink, RouterModule, NgForOf, CommonModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    navLinks: Array<any> = [
        {
            routerLink: '',
            text: 'Home',
        },
        {
            routerLink: '/recipes',
            text: 'Recipes',
        },
        {
            routerLink: '/style',
            text: 'DEV style',
        },
        {
            routerLink: '/meal-planner',
            text: 'Plan',
        }

    ];
    loggedInUser: UserListDto | null;

    constructor(private loggedInUserService: LoggedInUserService) {
        this.loggedInUser = loggedInUserService.getLoggedInUser();
    }

    logOut(): void {
        this.loggedInUserService.logOut();
        this.removeLoggedInUser();
    }

    isLoggedIn():boolean{
        return this.loggedInUser!=null;
    }

    private removeLoggedInUser() {
        this.loggedInUser = null;
    }

}
