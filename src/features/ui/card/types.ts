import { type UUID } from '@app/shared/types'

export interface ICardData {
  id?: UUID
  cover?: string
  title?: string
  createdAt?: Date
  view?: number
  comment?: number
  share?: number
  favorite?: number
  author?: {
    name?: string
    avatarUrl?: string
  }
  description?: string
}
