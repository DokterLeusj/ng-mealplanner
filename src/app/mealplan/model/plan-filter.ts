export interface PlanFilter {
    mealsPerDay?: number;
    dietaryNeeds?: { id:number,name:string }[]|null;
}
