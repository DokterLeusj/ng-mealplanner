import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {RecipeFilterField} from "../model/recipe-filter-field";
import {RecipeService} from "../../recipe.service";
import {RecipesFilter} from "../model/recipes-filter";
import {UserService} from "../../user.service";
import {DropdownOption} from "../../ui/model/dropdown-option";


@Component({
    selector: 'app-recipe-filter',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf, NgForOf, NgMultiSelectDropDownModule, NgClass
    ],
    templateUrl: './recipe-filter.component.html',
    styleUrl: './recipe-filter.component.css',
    encapsulation: ViewEncapsulation.None
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
        recipeNameControl: new FormControl(""),
        authorControl: new FormControl([]),
        excludedCategory: new FormControl([]),
        dietaryNeed: new FormControl([]),
    });

    dropdownsInfo: RecipeFilterField[] = [
        new RecipeFilterField("recipeNameControl",
            "Title contains: ",
            'text'
        ),
        new RecipeFilterField("authorControl",
            "Author(s)",
            'dropdown'
        ),
        new RecipeFilterField("excludedCategory",
            "Excluded category(s)",
            'dropdown',
            // this.recipeService.getAllFoodCategories
        ),
        new RecipeFilterField("dietaryNeed",
            "Dietary needs",
            'dropdown'),
    ];
    @Output()
    filterEvent = new EventEmitter<RecipesFilter>();

    constructor(private recipeService: RecipeService, private userService: UserService) {
        for (let dropdown of this.dropdownsInfo) {
            if (dropdown.controlKey == "authorControl") {
                this.userService.getAllUsers(true).subscribe(
                    response => {
                               let dropdownOptions:Array<DropdownOption>=
                                response.map(u=>new DropdownOption(u.id,u.username))
                            dropdown.setOptions(dropdownOptions);
                        })
            } else if (dropdown.controlKey == "excludedCategory") {
                this.recipeService.getAllFoodCategories().subscribe(
                    response => {
                        let dropdownOptions:Array<DropdownOption>=
                            response.map(f=>new DropdownOption(f.id,f.name))
                        dropdown.setOptions(dropdownOptions);
                    })
            } else if (dropdown.controlKey == "dietaryNeed") {
                this.recipeService.getAllDiets().subscribe(response => {
                    let dropdownOptions:Array<DropdownOption>=
                        response.map(d=>new DropdownOption(d.id,d.name))
                    dropdown.setOptions(dropdownOptions);
                });
            }
        }
    }

    updateSendFilter() {
        this.sendFilter(this.getRecipeFilterToRecipeFilter());
    }

    getRecipeFilterToRecipeFilter(): RecipesFilter {
        const formValues = this.recipeFilterForm.getRawValue();
        return {
            nameContains: formValues.recipeNameControl,
            authorIds: this.getFormControlArrayIds(formValues.authorControl),
            excludedCategoryIds: this.getFormControlArrayIds(formValues.excludedCategory),
            dietaryNeedIds: this.getFormControlArrayIds(formValues.dietaryNeed)
        };
    }

    getFormControlArrayIds(objArr: any[]): number[] {
        return objArr.map(o => o.id);
    }

    sendFilter(value: RecipesFilter
    ) {
        this.filterEvent.emit(value);
    }
}
