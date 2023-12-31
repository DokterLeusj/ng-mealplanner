import { Routes } from '@angular/router';
import {HomePageComponent} from "./home/home-page/home-page.component";
import {StylePageComponent} from "./style-page/style-page.component";
import {RecipeDetailComponent} from "./recipe/recipe-detail/recipe-detail.component";
import {RecipesPageComponent} from "./recipe/recipes-page/recipes-page.component";
import {MealplanPageComponent} from "./mealplan/mealplan-page/mealplan-page.component";

export const routes: Routes = [
  {path:"", component:HomePageComponent},
  // {path:"style", component:StylePageComponent},
  {path:"recipes", component:RecipesPageComponent},
  {path:"recipes/:id", component:RecipeDetailComponent},
//   TODO: make mealplanner page not accessible unless logged in
  {path:"meal-planner", component:MealplanPageComponent}
];
