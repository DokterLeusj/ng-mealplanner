import {RecipeListDto} from "../../../recipe/model/dto/recipe-list-dto";

export interface MealPlanDayDto {
    id:number|null,
    dayNumber:number,
    recipes:RecipeListDto[]
}
