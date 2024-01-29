export interface IBaseIngredient {
  id: number
  name: string
  isAlcohol: boolean
  alcoholDegree: number
  updatedAt: string
  createdAt: string
}

export type IFetchIngredients = number[]
