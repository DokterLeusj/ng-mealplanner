import {HttpClient} from "@angular/common/http";
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {RecipeListDto} from "./recipe/model/recipe-list-dto";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private readonly BASE_API_URL: string = 'http://localhost:8080/api/v1';
  private readonly RECIPE_URL: string = this.BASE_API_URL + '/recipe';

  constructor(private httpClient: HttpClient) { }

  getAllRecipes(): Observable<Array<RecipeListDto>> {
    return this.httpClient.get<Array<RecipeListDto>>(this.RECIPE_URL);
  }
}
