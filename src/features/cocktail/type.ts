import { IBasePaginate, type UUID } from '@/app/shared/types'
import { faker } from '@faker-js/faker'

export interface IBaseCocktail {
  id: UUID
  name: string
  description: string
  alcoholLevel: number
  alcoholMaxLevel: number
  alcoholMinLevel: number
  picture: string
  ingredients: IIngredient[]
}

export interface IIngredient {
  id: UUID
  proportion: number
  order: number
  name: string
  isAlcohol: boolean
  alcoholDegree: number
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
