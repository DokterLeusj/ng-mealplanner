export interface RecipesFilter {
  nameContains?: string;
  authorIds?: number[];
  excludedCategoryIds?: number[];
  dietaryNeedIds?: number[];
}
