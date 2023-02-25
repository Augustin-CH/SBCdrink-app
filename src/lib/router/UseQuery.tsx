import { useLocation } from 'react-router-dom'
import React from 'react'

export function useQuery () {
  const { search } = useLocation()

  return React.useMemo(() => new URLSearchParams(search), [search])
}

export const queryToArray = (query: string) => {
  return query?.split(',').map((id: string) => id)
}
