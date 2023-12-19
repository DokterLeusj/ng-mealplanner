import {map, Observable} from "rxjs";
import {DropdownOption} from "./model/dropdown-option";

export class DropdownUtility {
    static uniqueIdFilterObject(valueContainingId:any, index:number, array:any[]) {
        return array.findIndex(t=>t.id===valueContainingId.id) == index;
    }
    static getDropdownSettings():object{
        return { //IDropdownSettings
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
    }
    static getFormControlArrayIds(objArr: any[]): number[] {
        return objArr.map(o => o.id);
    }
}
