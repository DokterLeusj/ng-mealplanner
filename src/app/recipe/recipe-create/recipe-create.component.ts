import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
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
import {MatSelectModule} from "@angular/material/select";
import {last} from "rxjs";

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
    MatSelectModule,
    NgClass,
  ],
  templateUrl: './recipe-create.component.html',
  styleUrl: './recipe-create.component.css'
})
export class RecipeCreateComponent implements OnInit {
  public recipeForm!: FormGroup;
  public units!:Array<any>;
  public ingredients!:Array<any>;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.recipeForm= this.fb.group({
        recipeName: ['', Validators.required],
        // imgUrl: ['', Validators.required],
        description: ['', Validators.required],
        ingredients: this.fb.array([this.getNewIngredientGroup(0)]),
        instructions: this.fb.array([this.getNewInstructionGroup(0)])
      }
    );
    this.units=[
      {value:"kg",viewValue:"kg"},
      {value:"tbs",viewValue:"tbs"},
      {value:"piece",viewValue:"piece"},
    ];
    this.ingredients=[
      {value:"1",viewValue:"carrot"},
      {value:"2",viewValue:"potato"},
      {value:"3",viewValue:"tofu"},
    ];
  }

  private getNewInstructionGroup(step: number): FormGroup {
    return this.fb.group({
      step: new FormControl({value: step, disabled: true}),
      instruction: ['', Validators.required]
    });
  }

  private getNewIngredientGroup(id:number): FormGroup {
    return new FormGroup(
      {
        id:new FormControl({value:id,disabled:true}),
        qty: new FormControl(1,[Validators.min(1),Validators.required]),
        unit: new FormControl('',[Validators.required]),
        ingredient: new FormControl('',[Validators.required])
      });
  }

  public getIngredientsFormArray() {
    return this.recipeForm.get("ingredients") as FormArray;
  }

  private getInstructionsFormArray() {
    return this.recipeForm.get("instructions") as FormArray;
  }

  public addIngredientGroup(): void {
    const initArray = this.getIngredientsFormArray();
    initArray.push(this.getNewIngredientGroup(initArray.length));
  }
  public removeIngredientGroup(index:number): void {
    const initArray = this.getIngredientsFormArray();
    initArray.removeAt(index);
  }

  public addInstructionControl(): void {
    const initArray = this.getInstructionsFormArray();
    initArray.push(this.getNewInstructionGroup(initArray.length));
  }
public isOneIngredient(){
 return this.getIngredientsFormArray().getRawValue().length==1
}

  submitRecipe() {

  }

}
