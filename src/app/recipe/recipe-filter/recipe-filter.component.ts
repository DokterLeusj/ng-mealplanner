import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RecipeFilterTransferService} from "../../recipe-filter-transfer.service";
import {RecipeService} from "../../recipe.service";
import {RecipeListDto} from "../model/recipe-list-dto";
import {FilterPipeComponent} from "../../util/filter-pipe/filter-pipe.component";
import {NgForOf, NgIf} from "@angular/common";
import {IDropdownSettings, NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';

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
    // ingredients: List<string> = ["cheese", "potato", "onion"];
    // authors: List<string> = ["jantje", "kevin1", "garnaalmaster22"];
    // dietaryPreferences: List<string> = ["vegetarian", "pork"];
    //
    recipeFilterForm = new FormGroup({
        recipeName: new FormControl(""),
        ingredients: new FormControl([]),
        dietaryPreferences: new FormControl([]),
        author: new FormControl([])
    });
    // searchTexts = {
    //     recipeName: "",
    //     ingredients: "",
    //     dietaryPreference: "",
    //     author: ""
    // };
    selectedItems: any;
    dropdownSettings = { //IDropdownSettings
        singleSelection: false,
        idField: 'id',
        textField: 'name',
        selectAllText: 'Select All',
        unSelectAllText: 'Unselect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
    };
    ngOnInit() {
        this.selectedItems = [
            // {id: 3, name: 'Pune'},
            // {id: 4, name: 'Navsari'}
        ];
    }
    constructor(private filterService: RecipeFilterTransferService,
                private recipeService: RecipeService,
                // private filterPipe: FilterPipeComponent
    ) {
        recipeService.getAllRecipes().subscribe(
            response=> {
                this.allRecipes = response.map(r=>({id:r.id, name:r.name}))
            });
    }


    sendFilter() {
        this.filterService.sendFilter(this.recipeFilterForm.getRawValue());
        console.log(JSON.stringify(this.recipeFilterForm.getRawValue()))
    }

}
