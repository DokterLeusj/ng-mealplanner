import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {RecipeListDto} from "./recipe/model/dto/recipe-list-dto";
import {FoodListDto} from "./recipe/model/dto/food-list-dto";
import {DietListDto} from "./recipe/model/dto/diet-list-dto";
import {RecipesFilter} from "./recipe/model/recipes-filter";


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private readonly BASE_API_URL: string = 'http://localhost:8080/api/v1';
  private readonly RECIPE_URL: string = this.BASE_API_URL + '/recipe';
  private readonly FOOD_CATEGORY_URL: string = this.BASE_API_URL + '/food-category';
  private readonly DIET_URL: string = this.BASE_API_URL + '/diet';
  private readonly RECIPE_FILTER_URL: string = this.RECIPE_URL+ '/filter';


  constructor(private httpClient: HttpClient) {
  }


  getAllFilteredRecipes(filter:RecipesFilter): Observable<Array<RecipeListDto>> {
      let params=new HttpParams();
      console.log(filter)
    if (filter.nameContains!=undefined) {
      console.log("nameContains "+filter.nameContains)
      params=params.set("nameContains", filter.nameContains);
      console.log(params.toString());

    }
    if (filter.authorIds) {
      for (const author of filter.authorIds) {
        params=params.append("authorIds", author.toString());
      }
    }
    if (filter.excludedCategoryIds) {
      for (const cat of filter.excludedCategoryIds) {
        params=params.append("excludedCategoryIds", cat.toString());
      }
    }
    if (filter.dietaryNeedIds) {
      for (const diet of filter.dietaryNeedIds) {
        params= params.append("dietaryNeedIds", diet.toString());
      }
    }
    console.log(params.toString());
    console.log('Request URL:', this.RECIPE_FILTER_URL, '?', params.toString());
      return this.httpClient.get<Array<RecipeListDto>>(this.RECIPE_FILTER_URL, {params:params})
        // .pipe(
        //   catchError(this.handleError<Hero[]>('searchHeroes', []))
        // );
    }



  getRecipeById(id: number): Observable<any> {
    return this.httpClient.get(this.RECIPE_URL + '/' + id)
  }

  getAllFoodCategories(): Observable<Array<FoodListDto>> {
    return this.httpClient.get<Array<FoodListDto>>(this.FOOD_CATEGORY_URL);
  }

  getAllDiets(): Observable<Array<DietListDto>> {
    return this.httpClient.get<Array<DietListDto>>(this.DIET_URL);
  }
}
