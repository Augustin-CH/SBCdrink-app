export interface IBaseRecipeIngredient {
  id: number
  ingredient: number
  recipe: number
  orderIndex: number
  proportion: number
}

export type IFetchRecipeIngredients = number[]
