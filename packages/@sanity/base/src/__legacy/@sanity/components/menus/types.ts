export type JsonParams = Record<string, unknown>

export type BaseIntentParams = {
  type?: string
  id?: string
  template?: string
}

export type IntentParams = BaseIntentParams | [BaseIntentParams, JsonParams]

export interface Intent {
  type: string
  params?: IntentParams
}

type ShowAsAction = {
  whenCollapsed: boolean
}

export interface MenuItem {
  action?: string | ((params: Record<string, string> | undefined, scope?: any) => void)
  danger?: boolean
  group?: string
  icon?: React.ComponentType<{className?: string}>
  intent?: Intent
  isDisabled?: boolean
  key?: string
  title: React.ReactNode
  params?: Record<string, string>
  showAsAction?: boolean | ShowAsAction
  url?: string
  shortcut?: string
}

export interface MenuItemGroup {
  id: string
  title?: string
}
