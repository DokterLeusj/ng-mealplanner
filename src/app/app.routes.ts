import { Routes } from '@angular/router';
import {HomePageComponent} from "./home/home-page/home-page.component";
import {StylePageComponent} from "./style-page/style-page.component";
import {RecipeDetailComponent} from "./recipe/recipe-detail/recipe-detail.component";

export const routes: Routes = [
  {path:"", component:HomePageComponent},
//   TODO: hide test page unless developer after login
  {path:"style", component:StylePageComponent},
  {path:"recipe/1", component:RecipeDetailComponent}
];
