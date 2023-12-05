export interface RecipeListDto {
  id:number;
  name:string|null;
  description:string|null;
  imgUrl:string|null;
  nutriTech:boolean;
  author:{
    id:number;
    username:string;
  }
}

