import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FilterField} from "../../util/model/filter-field";
import {RecipesFilter} from "../../recipe/model/recipes-filter";
import {RecipeService} from "../../recipe.service";
import {UserService} from "../../user.service";
import {DropdownOption} from "../../util/model/dropdown-option";
import {DropdownUtility} from "../../util/dropdown-utility";
import {Observable} from "rxjs";
import {PlanFilter} from "../model/plan-filter";

@Component({
  selector: 'app-plan-filter',
  standalone: true,
    imports: [
        NgForOf,
        NgIf,
        NgMultiSelectDropDownModule,
        ReactiveFormsModule,
        NgClass
    ],
  templateUrl: './plan-filter.component.html',
  styleUrl: './plan-filter.component.css'
})
export class PlanFilterComponent {
    @Input()
    isShowFilter!: boolean;

    dropdownSettings = DropdownUtility.getDropdownSettings();
    planFilterForm: FormGroup = new FormGroup({
        mealsPerDay: new FormControl(""),
        dietaryNeed: new FormControl([]),
    });

    filterFields: FilterField[] = [
        new FilterField("mealsPerDay",
            "Meals per day",
            'text',
            undefined
        ),
        new FilterField("dietaryNeed",
            "Dietary needs",
            'field',
            undefined
        )

    ];
    @Output()
    filterEvent = new EventEmitter<RecipesFilter>();

    constructor(private recipeService: RecipeService, private userService: UserService) {
        for (let field of this.filterFields) {
            this.populateDropdownOptions("dietaryNeed", this.recipeService.getAllDiets(), d => new DropdownOption(d.id, d.name));
        }
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
        this.sendFilter(this.getFormValuesToPlanFilter());
    }

    private getFormValuesToPlanFilter(): PlanFilter {
        const formValues = this.planFilterForm.getRawValue();
        return {
            mealsPerDay:formValues.mealsPerDay,
            dietaryNeedIds:DropdownUtility.getFormControlArrayIds(formValues.dietaryNeed)
        };
    }

    private sendFilter(value: RecipesFilter
    ) {
        this.filterEvent.emit(value);
    }
}
