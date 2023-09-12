import { type UUID } from '@/app/shared/types'
import { type IBaseIngredient } from '@/features/ingredient/types'

export interface IBaseCocktail {
  id: UUID
  name: string
  description: string
  alcoholLevel: number
  alcoholMaxLevel: number
  alcoholMinLevel: number
  picture: string
  ingredients: IBaseIngredient[]
}

export interface IStepMakeCocktail {
  order: number
  ingredient: UUID
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
