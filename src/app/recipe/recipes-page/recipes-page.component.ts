import {Component} from '@angular/core';
import {RecipeCardComponent} from "../recipe-card/recipe-card.component";
import {RecipeListDto} from "../model/dto/recipe-list-dto";
import {NgClass, NgForOf} from "@angular/common";
import {RecipeService} from "../../recipe.service";
import {RecipeFilterComponent} from "../recipe-filter/recipe-filter.component";
import {RecipesFilter} from "../model/recipes-filter";
import {RecipeDropdown} from "../model/recipe-dropdown";

@Component({
  selector: 'app-recipes-page',
  standalone: true,
  imports: [
    RecipeCardComponent,
    NgForOf,
    RecipeFilterComponent,
    NgClass,
  ],
  templateUrl: './recipes-page.component.html',
  styleUrl: './recipes-page.component.css'
})
export class RecipesPageComponent {
  displayedRecipes: Array<RecipeListDto>=[];
  filter:RecipesFilter={};
  isShowFilter=true;
  constructor(private recipeService:RecipeService) {
  }
  toggleDisplayFilter():void{
    this.isShowFilter=!this.isShowFilter;
  }
  updateFilter(filter:RecipesFilter):void{
    this.filter = { ...filter }
  }

  filterRecipes(filter:RecipesFilter){
    this.updateFilter(filter);
    this.recipeService.getAllFilteredRecipes(filter).subscribe(response =>{
      this.displayedRecipes=response.filter(Boolean);
    })
  }

}
