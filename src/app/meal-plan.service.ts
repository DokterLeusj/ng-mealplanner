import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {RecipesFilter} from "./recipe/model/recipes-filter";
import {Observable} from "rxjs";
import {RecipeListDto} from "./recipe/model/dto/recipe-list-dto";
import {PlanFilter} from "./mealplan/model/plan-filter";
import {MealPlanDraftDto} from "./mealplan/model/dto/meal-plan-draft-dto";

@Injectable({
    providedIn: 'root'
})
export class MealPlanService {
    private readonly BASE_API_URL: string = 'http://localhost:8080/api/v1';
    private readonly PLAN_URL: string = this.BASE_API_URL + '/meal-plan';
    private readonly DRAFT_URL: string = this.PLAN_URL + '/draft';

    constructor(private httpClient: HttpClient) {
    }

    public getMealPlanDraft(filter: PlanFilter): Observable<MealPlanDraftDto> {
        return this.httpClient.get<MealPlanDraftDto>(
            this.DRAFT_URL,{params: this.getParamsPlanFilter(filter)});
    }
    private getParamsPlanFilter(filter: PlanFilter): HttpParams {
        let params = new HttpParams();
        if(filter.mealsPerDay){
            params=params.append("mealsPerDay",filter.mealsPerDay);
        }
        if (filter.dietaryNeeds) {
            for (const dietaryNeed of filter.dietaryNeeds) {
                params = params.append("dietaryNeeds", dietaryNeed.id.toString());
            }
        }
        return params;
    }
}
