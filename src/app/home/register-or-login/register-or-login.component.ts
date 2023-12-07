import {Component} from '@angular/core';
import {RegisterOrLoginFormComponent} from "../register-or-login-form/register-or-login-form.component";

@Component({
  selector: 'app-register-or-login',
  standalone: true,
  imports: [
    RegisterOrLoginFormComponent
  ],
  templateUrl: './register-or-login.component.html',
  styleUrl: './register-or-login.component.css'
})
export class RegisterOrLoginComponent {

}
