import { type IBaseMeta, type UUID } from '@/app/shared/types'

export interface IBaseIngredient {
  id: UUID
  proportion: number
  order: number
  name: string
  isAlcohol: boolean
  alcoholDegree: number
}

export interface IFetchIngredients {
  data: Array<{
    id: UUID
    attributes: Omit<IBaseIngredient, 'id'>
  }>
  meta: IBaseMeta
}
