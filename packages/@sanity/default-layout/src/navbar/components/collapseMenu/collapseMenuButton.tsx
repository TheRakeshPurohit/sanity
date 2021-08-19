import React from 'react'
import {Button, ButtonProps} from '@sanity/ui'

export interface CollapseMenuButtonProps
  extends Omit<ButtonProps, 'text' | 'icon' | 'children' | 'iconRight'> {
  text: React.ReactNode
  icon: React.ComponentType | React.ReactNode
}

export function CollapseMenuButton({...props}: CollapseMenuButtonProps) {
  return <Button {...props} data-ui="CollapseMenuButton" />
}
