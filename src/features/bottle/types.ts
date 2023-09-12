export interface IBaseBottle {
  slot: number
  measureVolume: number
  ingredientName: string
  ingredientId: number
}

export interface IUpdateBottles {
  bottle: IBaseBottle
}
