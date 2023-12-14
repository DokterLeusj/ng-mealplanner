export class ArrayUtility {
    static uniqueIdFilterObject(valueContainingId:any, index:number, array:any[]) {
        return array.findIndex(t=>t.id===valueContainingId.id) == index;
    }
}
