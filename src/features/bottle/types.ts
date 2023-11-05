import { type UUID } from '@/app/shared/types'

export interface IBaseBottle {
  slot: number
  measureVolume: number
  ingredientName: string
  ingredientId: UUID
}

export interface IUpdateBottles {
  bottle: IBaseBottle
}
