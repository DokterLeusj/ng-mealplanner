import {Component, Input} from '@angular/core';
import {MealPlanDayDto} from "../model/dto/meal-plan-day-dto";
import {RecipeListDto} from "../../recipe/model/dto/recipe-list-dto";
import {RecipeCardComponent} from "../../recipe/recipe-card/recipe-card.component";
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-plan-day-card',
    standalone: true,
    imports: [
        RecipeCardComponent,
        NgForOf
    ],
    templateUrl: './plan-day-card.component.html',
    styleUrl: './plan-day-card.component.css'
})
export class PlanDayCardComponent {
    @Input()
    planDay!: MealPlanDayDto;



}
