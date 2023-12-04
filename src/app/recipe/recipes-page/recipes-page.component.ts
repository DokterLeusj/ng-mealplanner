import {Component} from '@angular/core';
import {RecipeCardComponent} from "../recipe-card/recipe-card.component";
import {RecipeListDto} from "../model/recipe-list-dto";
import {RecipeService} from "../../recipe.service";

@Component({
  selector: 'app-recipes-page',
  standalone: true,
  imports: [
    RecipeCardComponent,
  ],
  templateUrl: './recipes-page.component.html',
  styleUrl: './recipes-page.component.css'
})
export class RecipesPageComponent {
  recipes:Array<RecipeListDto>=[];

  constructor(private recipeService:RecipeService) {
    this.recipeService.getAllRecipes().subscribe(response =>{
      this.recipes=response;
    })
  }

}
