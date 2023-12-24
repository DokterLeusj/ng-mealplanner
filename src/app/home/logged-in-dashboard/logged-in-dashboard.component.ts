import { Component } from '@angular/core';
import {LoggedInUserService} from "../../logged-in-user.service";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-logged-in-dashboard',
  standalone: true,
    imports: [
        RouterLinkActive,
        RouterLink,
        NgForOf
    ],
  templateUrl: './logged-in-dashboard.component.html',
  styleUrl: './logged-in-dashboard.component.css'
})
export class LoggedInDashboardComponent {
    constructor(private loggedInUserService: LoggedInUserService) {
    }

    getUsername(): string | undefined {
        return this.loggedInUserService.getLoggedInUser()?.username;
    }

    getActionLinks(): Array<any> {
        return [{
            text: "Create a  Recipe",
            routerLink: "/recipes/new"
        },
            {
                text: "Generate a Meal Plan",
                routerLink: "/meal-planner"
            }
        ];
    }
}
