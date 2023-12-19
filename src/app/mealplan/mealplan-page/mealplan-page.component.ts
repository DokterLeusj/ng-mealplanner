import {Component} from '@angular/core';
import {PlanFilterComponent} from "../plan-filter/plan-filter.component";
import {RecipeFilterComponent} from "../../recipe/recipe-filter/recipe-filter.component";
import {RecipesFilter} from "../../recipe/model/recipes-filter";
import {PlanFilter} from "../model/plan-filter";
import {RecipeService} from "../../recipe.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {LoggedInUserService} from "../../logged-in-user.service";
import {InfoComponent} from "../../ui/info/info.component";
import {NoAccessComponent} from "../../ui/no-access/no-access.component";
import {NoMatchesFoundComponent} from "../../ui/no-matches-found/no-matches-found.component";
import {RecipeCardComponent} from "../../recipe/recipe-card/recipe-card.component";
import {SpinnerComponent} from "../../ui/spinner/spinner.component";
import {RecipeListDto} from "../../recipe/model/dto/recipe-list-dto";
import {MealPlanService} from "../../meal-plan.service";
import {MealPlanDraftDto} from "../model/dto/meal-plan-draft-dto";
import {MealPlanDayDto} from "../model/dto/meal-plan-day-dto";

@Component({
    selector: 'app-mealplan-page',
    standalone: true,
    imports: [
        PlanFilterComponent,
        RecipeFilterComponent,
        NgClass,
        NgIf,
        InfoComponent,
        NoAccessComponent,
        NgForOf,
        NoMatchesFoundComponent,
        RecipeCardComponent,
        SpinnerComponent
    ],
    templateUrl: './mealplan-page.component.html',
    styleUrl: './mealplan-page.component.css'
})
export class MealplanPageComponent {
    mealPlanDraft: MealPlanDraftDto | null = null;
    filter: PlanFilter = {};
    isPlanGenerated: boolean = false;
    isShowFilter = true;
    planDays: MealPlanDayDto[] =[];

    constructor(private loggedInUserService: LoggedInUserService, private mealPlanService: MealPlanService) {
        this.filter;
        this.generateMealPlan(this.filter);
    }

    toggleDisplayFilter(): void {
        this.isShowFilter = !this.isShowFilter;
    }

    updateFilter(filter: PlanFilter): void {
        this.filter = {...filter}
    }

    generateMealPlan(filter: PlanFilter) {
        this.planDays=[];
        this.isPlanGenerated = false;
        this.updateFilter(filter);
        this.mealPlanService.getMealPlanDraft(this.filter)
            .subscribe(
                response => {
                    this.mealPlanDraft = response;
                    this.isPlanGenerated = true;
                    this.planDays=response.mealPlanDays;
                }
            );
    }

    isLoggedIn(): boolean {
        return this.loggedInUserService.isLoggedIn();
    }
}
