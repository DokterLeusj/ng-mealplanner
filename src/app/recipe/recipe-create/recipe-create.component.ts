import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {FilterField} from "../../util/model/filter-field";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-recipe-create',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './recipe-create.component.html',
  styleUrl: './recipe-create.component.css'
})
export class RecipeCreateComponent implements OnInit {
  public recipeForm: FormGroup = this.fb.group({
      recipeName: ['', Validators.required],
      // imgUrl: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: this.fb.array([]),
      instructions: this.fb.array([])
    }
  );

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.addIngredientGroup();
    this.addInstructionControl();

  }

  private getNewInstructionGroup(step: number): FormGroup {
    return this.fb.group({
      step: new FormControl({value: step, disabled: true}),
      instruction: ['', Validators.required]
    });
  }

  private getNewIngredientGroup(): FormGroup {
    return new FormGroup(
      {
        qty: new FormControl(1),
        unit: new FormControl(),
        ingredient: new FormControl()
      });
  }

  private getIngredientsArray() {
    return this.recipeForm.get("ingredients") as FormArray;
  }

  private getInstructionsArray() {
    return this.recipeForm.get("instructions") as FormArray;
  }

  private addIngredientGroup(): void {
    const initArray = this.getIngredientsArray();
    initArray.push(this.getNewIngredientGroup());
  }

  private addInstructionControl(): void {
    const initArray = this.getInstructionsArray();
    initArray.push(this.getNewInstructionGroup(initArray.length));
  }


  submitRecipe() {

  }
}
