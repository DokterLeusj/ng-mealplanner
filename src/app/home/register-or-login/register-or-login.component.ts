import {Component} from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule, Validators,
} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";
import {UserService} from "../../user.service";
import {LoggedInUserService} from "../../logged-in-user.service";

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
    isRegisterNotLogin: boolean = false;
    showingPassword: boolean = false;
    isButtonActionClicked: boolean = false;
    isActionSuccessful: boolean = false;
    credentialsForm = new FormGroup({
        userRegisterEmail: new FormControl("someone@someone.com", [Validators.email, Validators.required]),
        userRegisterPassword: new FormControl("Someone1", [Validators.required, Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)])
    });

    constructor(private authService: AuthService, private router: Router, private loggedInUserService:LoggedInUserService) {
    }

    changeToggleRegisterNotLogin(): void {
        this.isRegisterNotLogin = !this.isRegisterNotLogin; // Login not implemented yet
    }

    toggleShowingPassword(): void {
        this.showingPassword = !this.showingPassword;
    }

    getPasswordType(): string {
        return this.showingPassword ? 'text' : 'password';
    }

    runActionButtonMethods(): void {
        this.isActionSuccessful = false;
        this.isButtonActionClicked = true;
        if (this.credentialsForm.valid) {
            const email: string | null = this.credentialsForm.controls.userRegisterEmail.value;
            const password: string | null = this.credentialsForm.controls.userRegisterPassword.value;
            if (email && password) {
                this.runAction(email, password);
                if(!this.isRegisterNotLogin){
                    this.isActionSuccessful =this.loggedInUserService.isLoggedIn();
                }
            }
        }
    }
    runAction(email: string, password: string) {
        this.isRegisterNotLogin ?
            this.authService.attemptRegister(email, password) :
            this.authService.attemptLogin(email, password);

    }
}
