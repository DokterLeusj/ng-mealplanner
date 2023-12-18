import { Component } from '@angular/core';
import {RouterLink, RouterModule} from "@angular/router";
import {CommonModule, NgForOf} from "@angular/common";
import {AuthService} from "../../home/auth.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterModule, NgForOf, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  navlinks: Array<any> = [
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

  constructor(private authService: AuthService) {
  }
  isLoggedIn():boolean{
    return this.authService.isLoggedIn()
  }

  getLoggedInUserUsername(): string{
    return this.authService.getUsername()
  }

  logout(): void{
    return this.authService.logout()
  }
}
