import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {FilterField} from "../../util/model/filter-field";
import {RecipeService} from "../../recipe.service";
import {RecipesFilter} from "../model/recipes-filter";
import {UserService} from "../../user.service";
import {DropdownOption} from "../../util/model/dropdown-option";
import {DropdownUtility} from "../../util/dropdown-utility";
import {map, Observable} from "rxjs";


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

    dropdownSettings = DropdownUtility.getDropdownSettings();
    recipeFilterForm: FormGroup = new FormGroup({
        recipeNameControl: new FormControl(""),
        authorControl: new FormControl([]),
        excludedCategory: new FormControl([]),
        dietaryNeed: new FormControl([]),
    });

    filterFields: FilterField[] = [
        new FilterField("recipeNameControl",
            "Title contains: ",
            'text',
            undefined
        ),
        new FilterField("authorControl",
            "Author(s)",
            'field',
            undefined
        ),
        new FilterField("excludedCategory",
            "Excluded category(s)",
            'field',
            undefined
        ),
        new FilterField("dietaryNeed",
            "Dietary needs",
            'field',
            undefined
        ),
    ];
    @Output()
    filterEvent = new EventEmitter<RecipesFilter>();

    constructor(private recipeService: RecipeService, private userService: UserService) {
            this.populateDropdownOptions("authorControl", this.userService.getAllUsers(true), u => new DropdownOption(u.id, u.username));
            this.populateDropdownOptions("excludedCategory", this.recipeService.getAllFoodCategories(), f => new DropdownOption(f.id, f.name));
            this.populateDropdownOptions("dietaryNeed", this.recipeService.getAllDiets(), d => new DropdownOption(d.id, d.name));
    }

    private populateDropdownOptions(
        controlKey: string,
        observable: Observable<any>,
        mapFunction: (item: any) => DropdownOption
    ): void {
        const field = this.filterFields.find(field => field.controlKey === controlKey);

        if (field) {
            observable.subscribe(response => {
                const dropdownOptions: Array<DropdownOption> = response.map(mapFunction);
                field.setOptions(dropdownOptions);
            });
        }
    }

    public updateSendFilter() {
        this.sendFilter(this.getRecipeFilterToRecipeFilter());
    }

    private getRecipeFilterToRecipeFilter(): RecipesFilter {
        const formValues = this.recipeFilterForm.getRawValue();
        return {
            nameContains: formValues.recipeNameControl,
            authorIds: DropdownUtility.getFormControlArrayIds(formValues.authorControl),
            excludedCategoryIds: DropdownUtility.getFormControlArrayIds(formValues.excludedCategory),
            dietaryNeedIds: DropdownUtility.getFormControlArrayIds(formValues.dietaryNeed)
        };
    }


    private sendFilter(value: RecipesFilter
    ) {
        this.filterEvent.emit(value);
    }
}
