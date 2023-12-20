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
import {catchError, Observable, of} from "rxjs";
import {PlanFilter} from "../model/plan-filter";
import {LoggedInUserService} from "../../logged-in-user.service";

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
    filterEvent = new EventEmitter<PlanFilter>();

    constructor(private recipeService: RecipeService, private loggedInUserService: LoggedInUserService) {
        this.populateDropdownOptions("dietaryNeed", this.recipeService.getAllDiets(), d => new DropdownOption(d.id, d.name));
        this.setDefaultFormValuesAndSendFilter();
    }

    private setDefaultFormValuesAndSendFilter(): void {
        this.loggedInUserService.getLoggedInUserPlanSettings()
            .pipe(catchError(e => {
                    return of(null);
                })
            )
            .subscribe(
                response => {
                    if (response != null) {
                        this.planFilterForm.patchValue({mealsPerDay: response.mealsPerDay, dietaryNeed: response.dietaryNeeds})
                        this.updateSendFilter();
                    }
                }
            );
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
            mealsPerDay: formValues.mealsPerDay,
            dietaryNeeds: formValues.dietaryNeed
        };
    }

    private sendFilter(value: PlanFilter
    ) {
        this.filterEvent.emit(value);
    }
}
