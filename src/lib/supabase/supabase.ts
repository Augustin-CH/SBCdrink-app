import { type RealtimeChannel, createClient } from '@supabase/supabase-js'
import { env } from '@/env'
import { type Database } from './database'

const supabase = createClient<Database>(
  env.REACT_APP_SUPABASE_URL,
  env.REACT_APP_SUPABASE_ANON_KEY
)

export default supabase

let unsubscribeCocktailsFunc: RealtimeChannel | null = null
export const setUnsubscribeCocktails = (unsubscribeFn: RealtimeChannel) => {
  unsubscribeCocktailsFunc = unsubscribeFn
}
export const unsubscribeCocktails = () => {
  if (unsubscribeCocktailsFunc) {
    unsubscribeCocktailsFunc.unsubscribe()
    unsubscribeCocktailsFunc = null
  }
}

let unsubscribeIngredientsFunc: RealtimeChannel | null = null
export const setUnsubscribeIngredients = (unsubscribeFn: RealtimeChannel) => {
  unsubscribeIngredientsFunc = unsubscribeFn
}
export const unsubscribeIngredients = () => {
  if (unsubscribeIngredientsFunc) {
    unsubscribeIngredientsFunc.unsubscribe()
    unsubscribeIngredientsFunc = null
  }
}

let unsubscribeRecipeIngredientsFunc: RealtimeChannel | null = null
export const setUnsubscribeRecipeIngredients = (unsubscribeFn: RealtimeChannel) => {
  unsubscribeRecipeIngredientsFunc = unsubscribeFn
}
export const unsubscribeRecipeIngredients = () => {
  if (unsubscribeRecipeIngredientsFunc) {
    unsubscribeRecipeIngredientsFunc.unsubscribe()
    unsubscribeRecipeIngredientsFunc = null
  }
}