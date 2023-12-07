import {Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-register-or-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf
  ],
  templateUrl: './register-or-login.component.html',
  styleUrl: './register-or-login.component.css'
})
export class RegisterOrLoginComponent {
  isRegisterNotLogin: boolean=true;
  changeToggleRegisterNotLogin(): void {
    // this.isRegisterNotLogin = !this.isRegisterNotLogin; // Login not implemented yet
  }
  showingPassword:boolean=false;
  isButtonActionClicked:boolean=false;

  userRegisterEmail = new FormControl("");
  userRegisterPassword = new FormControl("");

  getPasswordType(): string {
    return this.showingPassword ? 'text' : 'password';
  }
  toggleShowingPassword(): void {
    this.showingPassword = !this.showingPassword;
  }

  runActionButtonMethods():void{
    this.isButtonActionClicked=true;
    this.isRegisterNotLogin?this.attemptRegister():this.attemptLogin();
  }
  attemptRegister() {
  // if email already registered, display error message
    // if email not registered yet, display registration successful & go to Home
  }

  attemptLogin() {
  }

  // Validation
  showErrorFormatValidation():boolean{
    return this.isButtonActionClicked&&!this.isValidFormatCredentials();
  }
  showErrorCredentialsValidation():boolean {
    return this.isButtonActionClicked&&this.isValidFormatCredentials()&&!this.isValidCredentials();
  }
  getDisabledMessage():string {
    return "Please make all fields valid.";
  }
  getInvalidCredentialsMessage():string{
    return "This email address is already in use."
  }

  isValidEmail():boolean{
    return this.userRegisterEmail.value!="";
  }
  isValidPassword():boolean{
    return this.userRegisterPassword.value!="";
  }

  isValidFormatCredentials():boolean {
    return (this.isValidEmail()&&this.isValidPassword());
  }

  isValidCredentials():boolean{
    return false;
  }

}
