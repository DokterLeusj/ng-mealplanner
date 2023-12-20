export interface UserPlanDto {
    id:number,
    dietaryNeeds: { id:number,name:string }[],
    mealsPerDay:number
}

