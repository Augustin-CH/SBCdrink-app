import { type IBaseIngredient } from '@/features/ingredient/types'
import { type IBaseRecipeIngredient } from '@/features/recipeIngredient/types'

export interface IBaseCocktail {
  id: number
  name: string
  description: string
  alcoholLevel: number
  alcoholMaxLevel: number
  alcoholMinLevel: number
  picture: string
  isAvailable: boolean
}

export interface IPopulateRecipeIngredient extends Omit<IBaseRecipeIngredient, 'ingredient'> {
  ingredient: IBaseIngredient
}

export interface IPopulateCocktail extends IBaseCocktail {
  recipeIngredients: IPopulateRecipeIngredient[]
}

export interface IIngredientCocktailForm extends IBaseIngredient {
  orderIndex: number
  volume: number
}

export interface IFormCocktail extends Omit<IBaseCocktail, 'ingredients'> {
  glassVolume: number
  ingredients: IIngredientCocktailForm[]
}

export interface IStepMakeCocktail {
  order: number
  ingredientId: number
  ingredientName: string
  ingredientIsAlcohol: boolean
  ingredientAlcoholDegree: number
  quantity: number
}

export interface IMakeCocktail {
  recipeId: number
  recipeName: string
  alcoholLevel: number
  steps: IStepMakeCocktail[]
}

export interface IRules {
  glassVolume: number
  alcoholLevel: number
}

export interface IFormatStepMakeCocktail {
  rules: IRules
  cocktail: IPopulateCocktail
}

export interface IUpdateCocktail extends IBaseCocktail {}

export interface ICreateCocktail extends Omit<IBaseCocktail, 'id'> {}
