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

export interface IBasePagination {
  page: number
  pageCount: number
  pageSize: number
  total: number
}

export interface IBaseMeta {
  pagination: IBasePagination
}

// Slug is a copy of the enum from the backend (src/services/errors/types.ts)
export enum Slug {
  ErrRecipeNotFound = 'RECIPE_NOT_FOUND',
  ErrIngredientNotFound = 'INGREDIENT_NOT_FOUND',

  ErrOrderAlreadyInStatusCreated = 'ORDER_ALREADY_IN_STATUS_CREATED',

  ErrIncorrectInput = 'INVALID_INPUT',

  ErrInvalidEmail = 'INVALID_EMAIL',
  ErrInvalidPassword = 'INVALID_PASSWORD',
  ErrInvalidCredentials = 'INVALID_CREDENTIALS',
  ErrExpiredToken = 'EXPIRED_TOKEN',
  ErrInvalidRefleshToken = 'INVALID_REFRESH_TOKEN',
  ErrUserAlreadyExist = 'USER_ALREADY_EXIST',
  ErrUnknow = 'UNKNOW',
}
