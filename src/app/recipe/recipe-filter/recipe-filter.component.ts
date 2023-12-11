import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RecipeService} from "../../recipe.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {RecipeListDto} from "../model/recipe-list-dto";
import {ArrayUtility} from "../../util/array-utility";
import {TextUtility} from "../../util/text-utility";
import {emit} from "@angular-devkit/build-angular/src/tools/esbuild/angular/compilation/parallel-worker";


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
  protected readonly TextUtility = TextUtility;
  @Input()
  isShowFilter!: boolean;
  filter: object = {};

  allListRecipes: RecipeListDto[] = [];
  dropdownSettings = { //IDropdownSettings
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  recipeFilterForm = new FormGroup({
    recipeName: new FormControl([]),
    author: new FormControl([]),
    // Need Dto with categories and ingredients first
    // excludedCategory: new FormControl([]),
    // excludedIngredient: new FormControl([]),
  });
  @Output()
  filterEvent = new EventEmitter<object>();

  constructor(private recipeService: RecipeService,
  ) {
    recipeService.getAllRecipes().subscribe(
      response => {
        this.allListRecipes = response.filter(Boolean);
      });
  }
  updateSendFilter(){
    console.log(JSON.stringify(this.recipeFilterForm.getRawValue()))

    this.updateFilter();
    this.sendFilter(this.filter);
  }
sendFilter(value: object){
    this.filterEvent.emit(value);
}
  getFormDropdownValues(formControlName: string) {
    let returnData: Array<any> = [];
    if (formControlName === "recipeName") {
      returnData = this.allListRecipes.map(sr => ({id: sr.id, name: sr.name}))
    } else if (formControlName === "author") {
      returnData = this.allListRecipes
        .map(sr => ({id: sr.author.id, name: sr.author.username}))
    } else if (formControlName === "excludedCategory") {

    } else if (formControlName === "excludedIngredient") {

    }
    return returnData
      .filter((value, index, array) => ArrayUtility.uniqueIdFilterObject(value, index, array))
      .sort((v1, v2) => v1.name.toLowerCase() > v2.name.toLowerCase() ? 1 : -1);
  }

  getFormGroupControlNames(): string[] {
    return Object.keys(this.recipeFilterForm.controls);
  }

  updateFilter() {
    this.filter = this.recipeFilterForm.getRawValue();
  }
}
