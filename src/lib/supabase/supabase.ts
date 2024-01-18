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
