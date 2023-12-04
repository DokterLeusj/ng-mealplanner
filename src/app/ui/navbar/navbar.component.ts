import { Component } from '@angular/core';
import {RouterLink, RouterModule} from "@angular/router";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterModule, NgForOf],
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

  ];
}
