import {FoodUnitDto} from "./food-unit-dto";
import {IngredientNameDto} from "./ingredient-name-dto";

export interface RecipeIngredientDto {
  qty:number;
  foodUnit:FoodUnitDto;
  ingredient:IngredientNameDto;
}
