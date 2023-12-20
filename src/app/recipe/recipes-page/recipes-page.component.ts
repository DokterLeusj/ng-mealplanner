import {Component} from '@angular/core';
import {RecipeCardComponent} from "../recipe-card/recipe-card.component";
import {RecipeListDto} from "../model/dto/recipe-list-dto";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {RecipeService} from "../../recipe.service";
import {RecipeFilterComponent} from "../recipe-filter/recipe-filter.component";
import {RecipesFilter} from "../model/recipes-filter";
import {FilterField} from "../../util/model/filter-field";
import {NoMatchesFoundComponent} from "../../ui/no-matches-found/no-matches-found.component";
import {SpinnerComponent} from "../../ui/spinner/spinner.component";

@Component({
  selector: 'app-recipes-page',
  standalone: true,
  imports: [
    RecipeCardComponent,
    NgForOf,
    RecipeFilterComponent,
    NgClass,
    NgIf,
    NoMatchesFoundComponent,
    SpinnerComponent,
  ],
  templateUrl: './recipes-page.component.html',
  styleUrl: './recipes-page.component.css'
})
export class RecipesPageComponent {
  displayedRecipes: Array<RecipeListDto>=[];
  filter:RecipesFilter={};
  isFiltered:boolean=false;
  isShowFilter=true;
  constructor(private recipeService:RecipeService) {
    this.filterRecipes(this.filter);
  }
  toggleDisplayFilter():void{
    this.isShowFilter=!this.isShowFilter;
  }
  updateFilter(filter:RecipesFilter):void{
    this.filter = { ...filter }
  }

  filterRecipes(filter:RecipesFilter){
    this.isFiltered=false;
    this.updateFilter(filter);
    this.recipeService.getAllRecipesBy(filter).subscribe(response =>{
      this.displayedRecipes=response.filter(Boolean);
      this.isFiltered=true;
    })
  }

}
