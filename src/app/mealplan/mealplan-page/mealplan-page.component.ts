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
    // displayedDays: Array<>=[];
    filter: PlanFilter = {};
    isFiltered: boolean = false;
    isShowFilter = true;

    constructor(private loggedInUserService: LoggedInUserService) {
    }

    toggleDisplayFilter(): void {
        this.isShowFilter = !this.isShowFilter;
    }

    updateFilter(filter: PlanFilter): void {
        this.filter = {...filter}
    }

    generateMealPlan(filter: PlanFilter) {
        this.isFiltered = false;
        this.updateFilter(filter);
        // this.recipeService.getAllRecipesBy(filter).subscribe(response =>{
        //   this.displayedRecipes=response.filter(Boolean);
        //   this.isFiltered=true;
        // })
    }

    isLoggedIn(): boolean {
        return this.loggedInUserService.isLoggedIn();
    }
}
