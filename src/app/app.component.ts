import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NavbarComponent} from "./ui/navbar/navbar.component";
import {FooterComponent} from "./ui/footer/footer.component";
import {StylePageComponent} from "./style-page/style-page.component";
import {HttpClientModule} from "@angular/common/http";
import {RegisterOrLoginComponent} from "./home/register-or-login/register-or-login.component";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    RouterLink,
    NavbarComponent,
    FooterComponent,
    StylePageComponent,
    HttpClientModule,
    RegisterOrLoginComponent,
    NgMultiSelectDropDownModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ng-weeklymeal-planner';
  static loggedInUser:any=null;
}
