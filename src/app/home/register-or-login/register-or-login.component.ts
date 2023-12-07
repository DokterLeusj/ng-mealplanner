import { Component } from '@angular/core';

@Component({
  selector: 'app-register-or-login',
  standalone: true,
  imports: [],
  templateUrl: './register-or-login.component.html',
  styleUrl: './register-or-login.component.css'
})
export class RegisterOrLoginComponent {

  toggleRegisterNotLogin:boolean=true;
  changeToggleRegisterNotLogin():void{
    this.toggleRegisterNotLogin=!this.toggleRegisterNotLogin;
  }
}
