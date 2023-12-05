import {RecipeIngredientDto} from "./recipe-ingredient-dto";

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
}
