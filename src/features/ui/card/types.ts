import { type UUID } from '@app/shared/types'

export interface ICardData {
  id?: UUID
  cover?: string
  title?: string
  subTitle?: string
  description?: string
}
