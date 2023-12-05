import {Component} from '@angular/core';
import {RecipeCardComponent} from "../recipe-card/recipe-card.component";
import {RecipeListDto} from "../model/recipe-list-dto";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-recipes-page',
  standalone: true,
  imports: [
    RecipeCardComponent,
    NgForOf,
  ],
  templateUrl: './recipes-page.component.html',
  styleUrl: './recipes-page.component.css'
})
export class RecipesPageComponent {
  recipes: Array<RecipeListDto> = [
    {
      id: 1,
      name: "Garlic Pasta",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad autem, commodi corporis dolor, eaque eligendi error esse est maxime nesciunt officiis porro recusandae, repudiandae saepe sint ut vel vitae voluptatem." ,
      imgUrl: null,
      nutriTech: false,
      "author": {
        "id": 1,
        "username": "hello"
      }
    },
    {
      id: 1,
      name: "Garlic Pasta",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad autem, commodi corporis." ,
      imgUrl:  'https://placehold.co/100x200.png?text=Sorry!+No+image+yet&font=lato',
      nutriTech: false,
      "author": {
        "id": 1,
        "username": "hello"
      }
    },
    {
      id: 1,
      name: "Garlic Pasta",
      description: null,
      imgUrl:  'https://placehold.co/200x100.png?text=Sorry!+No+image+yet&font=lato',
      nutriTech: false,
      "author": {
        "id": 1,
        "username": "hello"
      }
    },
    {
      id: 1,
      name: "Garlic Pasta",
      description: null,
      imgUrl:  'https://placehold.co/300x300.png?text=Sorry!+No+image+yet&font=lato',
      nutriTech: false,
      "author": {
        "id": 1,
        "username": "hello"
      }
    },
    {
      id: 1,
      name: "Garlic Pasta",
      description: null,
      imgUrl:  'https://placehold.co/1000x2000.png?text=Sorry!+No+image+yet&font=lato',
      nutriTech: false,
      "author": {
        "id": 1,
        "username": "hello"
      }
    },
    {
      id: 1,
      name: "Garlic Pasta",
      description: null,
      imgUrl: null,
      nutriTech: false,
      "author": {
        "id": 1,
        "username": "hello"
      }
    },
    {
      id: 1,
      name: "Garlic Pasta",
      description: null,
      imgUrl: null,
      nutriTech: false,
      "author": {
        "id": 1,
        "username": "hello"
      }
    },
    {
      id: 1,
      name: "Garlic Pasta",
      description: null,
      imgUrl: null,
      nutriTech: false,
      "author": {
        "id": 1,
        "username": "hello"
      }
    },
    {
      id: 1,
      name: "Garlic Pasta",
      description: null,
      imgUrl: null,
      nutriTech: false,
      "author": {
        "id": 1,
        "username": "hello"
      }
    },
    {
      id: 1,
      name: "Garlic Pasta",
      description: null,
      imgUrl: null,
      nutriTech: false,
      "author": {
        "id": 1,
        "username": "hello"
      }
    },
    {
      id: 1,
      name: "Garlic Pasta",
      description: null,
      imgUrl: null,
      nutriTech: false,
      "author": {
        "id": 1,
        "username": "hello"
      }
    },


  ];

  // constructor(private recipeService:RecipeService) {
  //   this.recipeService.getAllRecipes().subscribe(response =>{
  //     this.recipes=response;
  //   })
  // }

}
