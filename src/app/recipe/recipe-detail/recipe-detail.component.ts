import { Component } from '@angular/core';
import {RecipeService} from "../../recipe.service";

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent {
  recipe: any;

  constructor(private recipeService: RecipeService) {
  }

}
