import { type IBaseIngredient } from '@/features/ingredient/types'

export interface IBaseCocktail {
  id: string
  name: string
  description: string
  alcoholLevel: number
  alcoholMaxLevel: number
  alcoholMinLevel: number
  picture: string
  steps: Array<{
    id: string
    ingredient: string
    proportion: number
    orderIndex: number
  }>
  isAvailable: boolean
}

export interface IPopulatedCocktail extends Omit<IBaseCocktail, 'steps'> {
  steps: Array<{
    id: string
    ingredient: IBaseIngredient
    proportion: number
    orderIndex: number
  }>
}

export interface IIngredientCocktailForm extends IBaseIngredient {
  orderIndex: number
  volume: number
}

export interface IFormCocktail extends Omit<IBaseCocktail, 'steps'> {
  glassVolume: number
  ingredients: IIngredientCocktailForm[]
}

export interface IStepMakeCocktail {
  orderIndex: number
  ingredient: number
  quantity: number
}

export interface IMakeCocktail {
  recipe: string
  steps: IStepMakeCocktail[]
}

export interface IRules {
  glassVolume: number
  alcoholLevel: number
}

export interface IFormatStepMakeCocktail {
  rules: IRules
  cocktail: IPopulatedCocktail
}

export interface IUpdateCocktail extends IBaseCocktail {}

export interface ICreateCocktail extends Omit<IBaseCocktail, 'id'> {}
