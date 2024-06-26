export interface IBaseIngredient {
  id: string
  name: string
  isAlcohol: boolean
  alcoholDegree: number
  viscosity: number
  updatedAt: string
  createdAt: string
}

export interface IUpdateIngredient extends IBaseIngredient {
}

export interface IFormIngredient extends IBaseIngredient {
}
