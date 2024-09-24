import { type IBaseIngredient } from '@/features/ingredient/types'
import { type IBaseFile } from '@features/file/types'

export interface IBaseCocktail {
  id: string
  name: string
  description: string
  alcoholLevel: number
  alcoholMaxLevel: number
  alcoholMinLevel: number
  picture: string
  defaultGlassVolume: number
  steps: Array<{
    id: string
    ingredient: string
    proportion: number
    orderIndex: number
  }>
  isAvailable: boolean
  createdAt: string
  updatedAt: string
}

export interface IPopulatedCocktail extends Omit<IBaseCocktail, 'steps' | 'picture'> {
  steps: Array<{
    id: string
    ingredient: IBaseIngredient
    proportion: number
    orderIndex: number
  }>
  picture?: IBaseFile
}

export interface IIngredientCocktailForm extends IBaseIngredient {
  orderIndex: number
  volume: number
  proportion: number
}

export interface IFormCocktail extends Omit<IBaseCocktail, 'steps'> {
  glassVolume: number
  ingredients: IIngredientCocktailForm[]
}

export interface IStepMakeCocktail {
  orderIndex: number
  ingredient: string
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
