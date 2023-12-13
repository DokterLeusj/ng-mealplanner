import {HttpClient} from "@angular/common/http";
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {RecipeListDto} from "./recipe/model/dto/recipe-list-dto";
import {FoodListDto} from "./recipe/model/dto/food-list-dto";
import {DietListDto} from "./recipe/model/dto/diet-list-dto";


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private readonly BASE_API_URL: string = 'http://localhost:8080/api/v1';
  private readonly RECIPE_URL: string = this.BASE_API_URL + '/recipe';
  private readonly FOOD_CATEGORY_URL: string = this.BASE_API_URL + '/food-category';
  private readonly DIET_URL: string = this.BASE_API_URL + '/diet';

  constructor(private httpClient: HttpClient) { }

  getAllRecipes(): Observable<Array<RecipeListDto>> {
    return this.httpClient.get<Array<RecipeListDto>>(this.RECIPE_URL);
  }

  getRecipeById(id: number): Observable<any>{
    return this.httpClient.get(this.RECIPE_URL + '/' + id)
  }
  getAllFoodCategories(): Observable<Array<FoodListDto>> {
    return this.httpClient.get<Array<FoodListDto>>(this.FOOD_CATEGORY_URL);
  }
  getAllDiets(): Observable<Array<DietListDto>> {
    return this.httpClient.get<Array<DietListDto>>(this.DIET_URL);
  }
}
