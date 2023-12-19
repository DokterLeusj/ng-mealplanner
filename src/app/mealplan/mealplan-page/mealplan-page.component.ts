import { Component } from '@angular/core';
import {PlanFilterComponent} from "../plan-filter/plan-filter.component";
import {RecipeFilterComponent} from "../../recipe/recipe-filter/recipe-filter.component";
import {RecipesFilter} from "../../recipe/model/recipes-filter";
import {PlanFilter} from "../model/plan-filter";
import {RecipeService} from "../../recipe.service";
import {NgClass, NgIf} from "@angular/common";
import {LoggedInUserService} from "../../logged-in-user.service";
import {InfoComponent} from "../../ui/info/info.component";

@Component({
  selector: 'app-mealplan-page',
  standalone: true,
  imports: [
    PlanFilterComponent,
    RecipeFilterComponent,
    NgClass,
    NgIf,
    InfoComponent
  ],
  templateUrl: './mealplan-page.component.html',
  styleUrl: './mealplan-page.component.css'
})
export class MealplanPageComponent {
  filter:PlanFilter={};
  isFiltered:boolean=false;
  isShowFilter=true;
  constructor(private loggedInUserService:LoggedInUserService) {
  }
  toggleDisplayFilter():void{
    this.isShowFilter=!this.isShowFilter;
  }
  updateFilter(filter:PlanFilter):void{
    this.filter = { ...filter }
  }

  generateMealPlan(filter:PlanFilter){
    this.isFiltered=false;
    this.updateFilter(filter);
    // this.recipeService.getAllRecipesBy(filter).subscribe(response =>{
    //   this.displayedRecipes=response.filter(Boolean);
    //   this.isFiltered=true;
    // })
  }
  isLoggedIn():boolean{
    return this.loggedInUserService.isLoggedIn();
  }
}
