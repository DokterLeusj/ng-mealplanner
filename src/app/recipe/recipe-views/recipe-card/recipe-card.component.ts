import {Component, Input} from '@angular/core';
import {RecipeListDto} from "../../model/dto/recipe-list-dto";
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css'
})
export class RecipeCardComponent {
  // @Input() recipe: any; // may or may not be necessary to replace RecipeListDto
  @Input()
  recipe!: RecipeListDto;
  getRecipeDescription():string{
    return     this.recipe.description==null||this.recipe.description===""?
      "Delicious recipe by "+this.recipe.author.username+"!":
      this.recipe.description;
  }
  getRecipeImgUrl():string{
     return  this.recipe.imgUrl==null||this.recipe.imgUrl===""?
       "assets/img/pexels-lukas-616401.jpg":
       this.recipe.imgUrl;
  }
}
