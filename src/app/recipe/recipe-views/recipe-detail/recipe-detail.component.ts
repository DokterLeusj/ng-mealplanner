import {Component, Input} from '@angular/core';
import {RecipeService} from "../../../recipe.service";
import {ActivatedRoute} from "@angular/router";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {RecipeDetailDto} from "../../model/dto/recipe-detail-dto";
import {RecipeListDto} from "../../model/dto/recipe-list-dto";
import {RecipeInstructionDto} from "../../model/dto/recipe-instruction-dto";
import {RecipeIngredientDto} from "../../model/dto/recipe-ingredient-dto";

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
