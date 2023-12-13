import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {RecipeListDto} from "../model/dto/recipe-list-dto";
import {FilterRecipe} from "../model/filter-recipe";
import {RecipeService} from "../../recipe.service";


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
  recipeFilterForm: FormGroup = new FormGroup("");
  filters: FilterRecipe[] = [
    new FilterRecipe("recipeNameControl",
      "Title contains: ",
      'text',
    ),
    new FilterRecipe("authorControl",
      "Author(s)",
      'dropdown'
    ),
    new FilterRecipe("excludedCategory",
      "Excluded category(s)",
      'dropdown'
    ),
    new FilterRecipe("dietaryNeeds",
      "Dietary needs",
      'dropdown'),
  ];

  constructor(private recipeService: RecipeService) {
    // this.recipeService
    // {
      for (let filter of this.filters) {
        if (filter.controlKey == "authorControl") {
          filter.setOptions([])
          // filter.setOptions(this.allRecipes.map(r => ({
          //   id: r.author.id,
          //   name: r.author.username
          // })));
        } else if (filter.controlKey == "excludedCategory") {
          this.recipeService.getAllFoodCategories().subscribe(response=> filter.setOptions(response))
        } else if (filter.controlKey == "dietaryNeeds") {
          this.recipeService.getAllDiets().subscribe(response=>   filter.setOptions(response))
        }
      }
      this.recipeFilterForm = this.toFormGroup(this.filters)

    // }
  }

  @Output()
  filterEvent = new EventEmitter<object>();

  toFormGroup(filters: FilterRecipe[]
  ) {
    const group: any = {};
    filters.forEach(filter => {
      group[filter.controlKey] = new FormControl([]);
    });
    return new FormGroup(group);
  }

  updateSendFilter() {
    this.sendFilter(this.recipeFilterForm.getRawValue());
  }

  getCategoryArr() {
    return []
  }

  getIngredientArr() {
    return []
  }

  sendFilter(value
               :
               object
  ) {
    this.filterEvent.emit(value);
  }


  // payLoad: string = '';
  //
  // onSubmit() {
  //   this.payLoad = JSON.stringify(this.recipeFilterForm.getRawValue());
  // }


}
