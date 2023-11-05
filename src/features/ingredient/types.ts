import { type IBaseMeta } from '@/app/shared/types'

export interface IBaseIngredient {
  id: number
  proportion: number
  order: number
  name: string
  isAlcohol: boolean
  alcoholDegree: number
}
export interface IFetchIngredients {
  data: Array<{
    id: number
    attributes: Omit<IBaseIngredient, 'id'>
  }>
  meta: IBaseMeta
}
