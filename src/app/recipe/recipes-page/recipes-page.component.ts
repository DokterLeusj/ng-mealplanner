import {Component} from '@angular/core';
import {RecipeCardComponent} from "../recipe-card/recipe-card.component";
import {RecipeListDto} from "../model/dto/recipe-list-dto";
import {NgClass, NgForOf} from "@angular/common";
import {RecipeService} from "../../recipe.service";
import {RecipeFilterComponent} from "../recipe-filter/recipe-filter.component";

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
  allRecipes: Array<RecipeListDto> =[];
  displayedRecipes: Array<RecipeListDto>=[];
  filter:object={};
  isShowFilter=true;
  constructor(private recipeService:RecipeService) {
    this.recipeService.getAllRecipes().subscribe(response =>{
      this.allRecipes=response.filter(Boolean);
      this.displayedRecipes=this.allRecipes;
    })
  }
  toggleDisplayFilter():void{
    this.isShowFilter=!this.isShowFilter;
  }
  updateFilter(filter:object):void{
    this.filter=filter;
  }

  filterRecipes(filter:object){
    this.updateFilter(filter);
    console.log(JSON.stringify(this.filter))
    // this.displayedRecipes=
      // this.allRecipes.
  }

}
