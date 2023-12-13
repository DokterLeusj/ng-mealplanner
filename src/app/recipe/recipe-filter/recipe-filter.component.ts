import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {RecipeDropdown} from "../model/recipe-dropdown";
import {RecipeService} from "../../recipe.service";
import {RecipesFilter} from "../model/recipes-filter";


@Component({
  selector: 'app-recipe-filter',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf, NgForOf, NgMultiSelectDropDownModule, NgClass
  ],
  templateUrl: './recipe-filter.component.html',
  styleUrl: './recipe-filter.component.css'
})
export class RecipeFilterComponent {
  @Input()
  isShowFilter!: boolean;


  dropdownSettings = { //IDropdownSettings
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    disabled: false,
    itemsShowLimit: undefined,
    allowSearchFilter: true,
    searchPlaceholderText: "Search ..."
  };
  recipeFilterForm: FormGroup = new FormGroup({
    recipeNameControl:new FormControl(""),
    authorControl:new FormControl([]),
    excludedCategory:new FormControl([]),
    dietaryNeed:new FormControl([]),
  });

  dropdownsInfo: RecipeDropdown[] = [
    new RecipeDropdown("recipeNameControl",
      "Title contains: ",
      'text',
    ),
    new RecipeDropdown("authorControl",
      "Author(s)",
      'dropdown'
    ),
    new RecipeDropdown("excludedCategory",
      "Excluded category(s)",
      'dropdown'
    ),
    new RecipeDropdown("dietaryNeed",
      "Dietary needs",
      'dropdown'),
  ];
  @Output()
  filterEvent = new EventEmitter<RecipesFilter>();

  constructor(private recipeService: RecipeService) {
    for (let dropdown of this.dropdownsInfo) {
      if (dropdown.controlKey == "authorControl") {
        dropdown.setOptions([])
        // filter.setOptions(this.allRecipes.map(r => ({
        //   id: r.author.id,
        //   name: r.author.username
        // })));
      } else if (dropdown.controlKey == "excludedCategory") {
        this.recipeService.getAllFoodCategories().subscribe(response => dropdown.setOptions(response))
      } else if (dropdown.controlKey == "dietaryNeeds") {
        this.recipeService.getAllDiets().subscribe(response => dropdown.setOptions(response))
      }
    }

    // }
  }

  updateSendFilter() {
    this.sendFilter(this.getRecipeFilterToRecipeFilter());
  }

  getRecipeFilterToRecipeFilter(): RecipesFilter {
    const formValues=this.recipeFilterForm.getRawValue();
    return {
      nameContains:formValues.recipeNameControl,
      authorIds:formValues.authorControl,
      excludedCategoryIds:formValues.excludedCategory,
      dietaryNeedIds:formValues.dietaryNeed
    };
  }

  getCategoryArr() {
    return []
  }

  getIngredientArr() {
    return []
  }

  sendFilter(value: RecipesFilter
  ) {
    this.filterEvent.emit(value);
  }
}
