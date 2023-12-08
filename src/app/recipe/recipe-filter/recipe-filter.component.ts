import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeFilterTransferService} from "../../recipe-filter-transfer.service";
import {IngredientNameDto} from "../model/ingredient-name-dto";
import {RecipeDetailDto} from "../model/recipe-detail-dto";
import {RecipeService} from "../../recipe.service";
import {RecipeListDto} from "../model/recipe-list-dto";

class List<T> {
}

@Component({
  selector: 'app-recipe-filter',
  standalone: true,
  imports: [],
  templateUrl: './recipe-filter.component.html',
  styleUrl: './recipe-filter.component.css'
})
export class RecipeFilterComponent {
  allRecipes: List<RecipeListDto> | undefined;
ingredients:List<string>=["cheese","potato","onion"];
authors:List<string>=["jantje","kevin1","garnaalmaster22"];
dietaryPreferences:List<string>=["vegetarian","pork"];

  recipeFilterForm= new FormGroup({
    name:new FormControl(""),
    ingredients:new FormControl([]),
    dietaryPreferences:new FormControl([]),
    author:new FormControl([])
  });

  constructor(private filterService: RecipeFilterTransferService, private recipeService:RecipeService) {}
  sendFilter() {
    this.filterService.sendFilter(this.recipeFilterForm.getRawValue());
    this.allRecipes= this.recipeService.getAllRecipes();
  }
}
