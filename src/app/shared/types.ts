export type DateTime = string
export type UUID = string
export type FetchStatus = 'idle' | 'loading' | 'succeeded' | 'failed'
export type StaffRole = 'pilot' | 'speaker' | 'administrator' | 'admin' | 'support'

export interface SelectOpt {
  label: string
  value: string
}

export interface IPaginateParams {
  page: number
  limit: number
  search: string
}

export interface IPaginate extends IPaginateParams {
  setPage: (page: number) => void
  setLimit: (limit: number) => void
  setSearch: (search: string) => void
  totalElements: number
}

export interface IBasePaginate {
  meta?: {
    perPages?: number
    totalElements?: number
    totalPages?: number
    currentPage?: number
  }
  links?: {
    first?: string
    self?: string
    last?: string
  }
}
