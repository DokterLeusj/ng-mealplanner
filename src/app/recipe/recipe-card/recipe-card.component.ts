import {Component} from '@angular/core';
import {RecipeListDto} from "../model/recipe-list-dto";
import {CommonModule, NgForOf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {RecipeService} from "../../recipe.service";


@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    NgForOf,
    CommonModule
  ],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css'
})
export class RecipeCardComponent {
  // @Input() recipe: any; // may or may not be necessary to replace RecipeListDto
 recipes: Array<RecipeListDto> = [];

  constructor(private recipeService: RecipeService) {
    this.recipeService.getAllRecipes().subscribe(response => {
      this.recipes = response
    })
  }


  getRecipeDescription(recipe: RecipeListDto): string {
    return recipe.description == null ?
      "Delicious recipe by " + recipe.author.username :
      recipe.description;
  }

  getRecipeImgUrl(recipe: RecipeListDto): string {
    return recipe.imgUrl == null ?
      'https://placehold.co/600x200.png?text=Sorry!+No+image+yet&font=lato' :
      recipe.imgUrl;
  }
}
