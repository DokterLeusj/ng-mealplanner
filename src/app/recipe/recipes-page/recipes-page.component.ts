import {Component} from '@angular/core';
import {RecipeCardComponent} from "../recipe-card/recipe-card.component";
import {RecipeListDto} from "../model/recipe-list-dto";
import {NgClass, NgForOf} from "@angular/common";
import {RecipeService} from "../../recipe.service";
import {RecipeFilterComponent} from "../recipe-filter/recipe-filter.component";
import {RecipeFilterTransferService} from "../../recipe-filter-transfer.service";

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
  recipes: Array<RecipeListDto> =[];
  filter:any;
  isShowFilter=true;
  constructor(private recipeService:RecipeService, private recipeFilterService: RecipeFilterTransferService) {
    this.recipeService.getAllRecipes().subscribe(response =>{
      this.recipes=response;
    })
    this.recipeFilterService.filter.subscribe(data => {
     this.filter=data;
    });
  }
  toggleDisplayFilter():void{
    this.isShowFilter=!this.isShowFilter;
  }

}
