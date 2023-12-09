import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RecipeFilterTransferService} from "../../recipe-filter-transfer.service";
import {RecipeService} from "../../recipe.service";
import {NgForOf, NgIf} from "@angular/common";
import {IDropdownSettings, NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {TextUtility} from "../../util/text-utility";

class List<T> {
}

@Component({
    selector: 'app-recipe-filter',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        NgForOf, NgMultiSelectDropDownModule
    ],
    templateUrl: './recipe-filter.component.html',
    styleUrl: './recipe-filter.component.css'
})
export class RecipeFilterComponent {
    allRecipes: object[] = [];
    dietaryPreferences: string[] = ["vegetarian", "pork"];
    ingredients: string[] = ["cheese", "potato", "onion"];
    authors: string[] = ["jantje", "kevin1", "garnaalmaster22"];

    selectedRecipes: object[] = [];
    // dropdownRecipeNames: object

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
        ingredient: new FormControl([]),
        dietaryPreference: new FormControl([]),
        author: new FormControl([])
    });


    getFormControlData(formControlName: string) {
        if(formControlName=== "recipeName"){
            return this.allRecipes;
        }else if(formControlName==="ingredient"){

        }else  if(formControlName==="dietaryPreference"){

        }else       if(formControlName==="author"){

        }
        return [];
    }

    getFormGroupControlNames(): string[] {
        return Object.keys(this.recipeFilterForm.controls);
    }

    formControlName: string = "recipeName";


    constructor(private filterService: RecipeFilterTransferService,
                private recipeService: RecipeService,
                // private filterPipe: FilterPipeComponent
    ) {
        recipeService.getAllRecipes().subscribe(
            response => {
                this.allRecipes = response.map(r => ({id: r.id, name: r.name}))
            });
    }


    sendFilter() {
        this.filterService.sendFilter(this.recipeFilterForm.getRawValue());


        // console.log(JSON.stringify(this.recipeFilterForm.getRawValue()))
    }

    protected readonly TextUtility = TextUtility;
}
