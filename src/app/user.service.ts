import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {RecipesFilter} from "./recipe/model/recipes-filter";
import {Observable} from "rxjs";
import {RecipeListDto} from "./recipe/model/dto/recipe-list-dto";
import { UserListDto } from './user/model/dto/user-list-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly BASE_API_URL: string = 'http://localhost:8080/api/v1';
  private readonly USER_URL: string = this.BASE_API_URL + '/user';

  constructor(private httpClient: HttpClient) {
  }

  getAllUsers(hasRecipes?:boolean): Observable<Array<UserListDto>> {
    let params=new HttpParams();
    if(hasRecipes!=undefined){
      params=params.set("hasRecipes",hasRecipes);
    }
     return this.httpClient.get<Array<UserListDto>>(
        this.USER_URL,
        {params: params}
    )
  }
}
