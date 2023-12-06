import {FoodUnitNameDto} from "./food-unit-name-dto";
import {IngredientNameDto} from "./ingredient-name-dto";

export interface RecipeIngredientDto {
  qty:number;
  foodUnit:FoodUnitNameDto;
  ingredient:IngredientNameDto;
}
