export interface RecipeListDto {
  id:number;
  name:string;
  description:string;
  imgUrl:string;
  nutriTech:boolean;
  author:{
    id:number;
    username:string;
  }
}

