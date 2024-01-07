import {Component} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormArray, FormBuilder, FormControl, FormGroup, FormRecord, Validators} from "@angular/forms";
import {RecipeIngredientDto} from "../model/dto/recipe-ingredient-dto";
import {RecipeInstructionDto} from "../model/dto/recipe-instruction-dto";

@Component({
  selector: 'app-recipe-create',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './recipe-create.component.html',
  styleUrl: './recipe-create.component.css'
})
export class RecipeCreateComponent {
  public recipeForm: FormGroup = new FormGroup<any>({});

  constructor(private fb: FormBuilder) {
  }


  ngOnInit() {
    this.recipeForm = this.fb.group({
        recipeName: ['', Validators.required],
        imgUrl: ['', Validators.required],
        description: ['', Validators.required],
        ingredients: this.fb.array([]),
        instructions: this.fb.array([])
      }
    );
    this.addIngredientGroup();
    this.addInstructionControl();

  }
  private getNewInstructionGroup(step: number): FormGroup {
    return this.fb.group({
      step:new FormControl({value:step, disabled: true}),
      instruction: ['',Validators.required]
    });
  }

  private getNewIngredientGroup(): FormGroup {
    return new FormGroup(
      {
        qty: new FormControl(),
        unit: new FormControl(),
        ingredient: new FormControl()
      });
  }

  private getIngredientsArray(){
   return this.recipeForm.get("ingredients") as FormArray;
  }
  private getInstructionsArray(){
    return this.recipeForm.get("instructions") as FormArray;
  }
  private addIngredientGroup(): void {
   const initArray= this.getIngredientsArray();
   initArray.push(this.getNewIngredientGroup());
  }
  private addInstructionControl(): void {
    const initArray= this.getInstructionsArray();
    initArray.push(this.getNewInstructionGroup(initArray.length));
  }


}
