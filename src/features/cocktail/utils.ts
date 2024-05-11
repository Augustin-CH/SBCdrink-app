import { type IIngredientCocktailForm } from './types'

const textPercentage = (value: number): string => {
  return `${value?.toFixed(0) ?? 0} %`
}

function textVolume (value: number): string {
  return `${value} cl`
}

const calculeTotalVolume = (ingredients: IIngredientCocktailForm[]): number => {
  return ingredients.reduce((acc, ingredient) => acc + ingredient.volume, 0)
}

const calculeVolumeIngredient = (alcoholLevel: number, glassVolume: number, proportion: number, isAlcohol: boolean): number => {
  const alcoholVolume = glassVolume * (alcoholLevel / 100)
  const noAlcoholVolume = glassVolume - alcoholVolume

  return Math.round((isAlcohol ? alcoholVolume : noAlcoholVolume) * (proportion / 100) * 10) / 10
}

export {
  textPercentage,
  calculeTotalVolume,
  textVolume,
  calculeVolumeIngredient
}
