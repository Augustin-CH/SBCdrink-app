import { type IBaseIngredient } from '@/features/ingredient/types'

export interface IBaseCocktail {
  id: number
  name: string
  description: string
  alcoholLevel: number
  alcoholMaxLevel: number
  alcoholMinLevel: number
  picture: string
  ingredients: IBaseIngredient[]
}

export interface IIngredientCocktailForm extends IBaseIngredient {
  volume: number
}

export interface IFormCocktail extends IBaseCocktail {
  glassVolume: number
  ingredients: IIngredientCocktailForm[]
}

export interface IStepMakeCocktail {
  order: number
  ingredient: number
  quantity: number
}

export interface IMakeCocktail extends Array<IStepMakeCocktail> {}

export interface IRules {
  glassVolume: number
  alcoholLevel: number
}

export interface IFormatStepMakeCocktail {
  rules: IRules
  cocktail: IBaseCocktail
}
