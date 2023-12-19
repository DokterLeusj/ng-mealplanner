import {MealPlanDayDto} from "./meal-plan-day-dto";

export interface MealPlanDraftDto {
    id: number,
    planPreference: {
        id: number | null,
        kcalTarget: number | null,
        mealsPerDay: number,
        servingsPerMeal: number | null,
    },
    "dietaryNeedIds": number[],
    "mealPlanDays": MealPlanDayDto[]
}
