export type NotificationType = 'default' | 'error' | 'success' | 'warning' | 'info'

export interface INotification {
  title: string
  type: NotificationType
}
