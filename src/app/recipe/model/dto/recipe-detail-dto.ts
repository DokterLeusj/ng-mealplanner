import {RecipeIngredientDto} from "./recipe-ingredient-dto";
import {RecipeInstructionDto} from "./recipe-instruction-dto";

export interface RecipeDetailDto {
  id:number;
  name:string;
  description:string;
  imgUrl:string;
  nutriTech:boolean;
  author:{
    id:number;
    username:string;
  }
  ingredients:RecipeIngredientDto[];
  instructions:RecipeInstructionDto[]
}
