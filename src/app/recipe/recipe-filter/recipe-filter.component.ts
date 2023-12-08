import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeFilterService} from "../../recipe-filter.service";

@Component({
  selector: 'app-recipe-filter',
  standalone: true,
  imports: [],
  templateUrl: './recipe-filter.component.html',
  styleUrl: './recipe-filter.component.css'
})
export class RecipeFilterComponent {
  constructor(private filterService: RecipeFilterService) {}
  sendFilter() {
    this.filterService.sendFilter('Hello from the child component!');
  }
  filterForm= new FormGroup({
    // userRegisterEmail: new FormControl("",[Validators.email,Validators.required]),
    // userRegisterPassword: new FormControl("",[Validators.required,Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)])
  });
}
