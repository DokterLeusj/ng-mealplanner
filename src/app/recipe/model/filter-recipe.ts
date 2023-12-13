import {ArrayUtility} from "../../util/array-utility";
import {FormControl, FormGroup, isFormControl} from "@angular/forms";

export class FilterRecipe {
  // {"recipeName":[],"author":[]}

//   id:number;
//   name:string;
//   description:string;
//   imgUrl:string;
//   nutriTech:boolean;
//   author:{
//     id:number;
//     username:string;
//   }
//   ingredients:RecipeIngredientDto[];
//   instructions:RecipeInstructionDto[]

  controlKey: string;
  label: string;
  order: number;
  controlType: string;
  options: { id: number, name: string }[];

  constructor(
    controlKey: string,
    label: string,
    controlType: string,
    options?: { id: number, name: string }[]
  ){
    this.controlKey = controlKey;
    this.label = label;
    this.order =1;
    this.controlType = controlType;
    this.options = options==undefined?[]:this.getFormattedDropdownData(options);
  }
  public setOptions(options:any[]){
    this.options=this.getFormattedDropdownData(options);
  }
  private getFormattedDropdownData(data: Array<any>) {
    return data
      .filter((value, index, array) => ArrayUtility.uniqueIdFilterObject(value, index, array))
      .sort((v1, v2) => v1.name.toLowerCase() > v2.name.toLowerCase() ? 1 : -1);
  }

}
