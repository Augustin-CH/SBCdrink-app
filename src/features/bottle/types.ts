import { type UUID } from '@/app/shared/types'
import { type IBaseIngredient } from '@/features/ingredient/types'

export interface IBaseBottle {
  id: UUID
  ingredient: UUID | null
  measureVolume: number | null
  slot: number
}

export interface IPopulatedBottle extends Omit<IBaseBottle, 'ingredient'> {
  ingredient: IBaseIngredient | null
}

export interface IUpdateBottles extends IBaseBottle {}
