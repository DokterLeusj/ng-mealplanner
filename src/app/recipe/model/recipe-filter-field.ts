import {ArrayUtility} from "../../util/array-utility";
import {FormControl, FormGroup, isFormControl} from "@angular/forms";
import {FoodListDto} from "./dto/food-list-dto";
import {Observable} from "rxjs";
import {DropdownOption} from "../../ui/model/dropdown-option";

export class RecipeFilterField {
  controlKey: string;
  label: string;
  order: number;
  controlType: string;
  // getOptionsFunction: undefined | Observable<FoodListDto[]>
  options: Array<DropdownOption>;

  constructor(
    controlKey: string,
    label: string,
    controlType: string,
    // getOptionsFunction?:Observable<FoodListDto[]>,
    options?: Array<DropdownOption>
  ){
    this.controlKey = controlKey;
    this.label = label;
    this.order =1;
    this.controlType = controlType;
    // this.getOptionsFunction= getOptionsFunction==undefined?undefined:getOptionsFunction;
    this.options = options==undefined?[]:this.getUniqueAlphabeticDropdownData(options);
  }
  public setOptions(options:DropdownOption[]){
    this.options=this.getUniqueAlphabeticDropdownData(options);
  }
  private getUniqueAlphabeticDropdownData(data: Array<DropdownOption>) {
    return data
      .filter((value, index, array) => ArrayUtility.uniqueIdFilterObject(value, index, array))
      .sort((v1, v2) => v1.name.toLowerCase() > v2.name.toLowerCase() ? 1 : -1);
  }

}
