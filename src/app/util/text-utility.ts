export class TextUtility {
    static getLabelFromVarName(varName:string):string{
        return (varName.split(/(?=[A-Z])/).join(" ")).toLowerCase();
    }
}
