import {Component, Input} from '@angular/core';
import {RecipeService} from "../../recipe.service";
import {ActivatedRoute} from "@angular/router";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {RecipeDetailDto} from "../model/recipe-detail-dto";
import {RecipeListDto} from "../model/recipe-list-dto";
import {RecipeInstructionDto} from "../model/recipe-instruction-dto";
import {RecipeIngredientDto} from "../model/recipe-ingredient-dto";

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage
  ],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent {
  recipe!: RecipeDetailDto;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.recipeService.getRecipeById(params['id']).subscribe((response:RecipeDetailDto )=>{
        response.instructions.sort((a:RecipeInstructionDto, b:RecipeInstructionDto) => a.step - b.step)
        response.ingredients.sort((a:RecipeIngredientDto, b:RecipeIngredientDto) =>
        a.ingredient.name.localeCompare(b.ingredient.name))
        this.recipe = response;
      })
    })
  }

}
