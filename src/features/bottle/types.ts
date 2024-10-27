import { type UUID } from '@/app/shared/types'
import { type IBaseIngredient } from '@/features/ingredient/types'

export interface IBaseBottle {
  id: UUID
  ingredientId: UUID | null
  measureVolume: number | null
  slot: number
  position: number | null
}

export interface IPopulatedBottle extends IBaseBottle {
  ingredient: IBaseIngredient | null
}

export interface IUpdateBottles extends IBaseBottle {}
