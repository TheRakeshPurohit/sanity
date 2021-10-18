import {MenuItem as MenuItemType} from '@sanity/base/__legacy/@sanity/components'
import {ComposeIcon} from '@sanity/icons'
import {Box, Button, Label, Menu, MenuButton, PopoverProps} from '@sanity/ui'
import React from 'react'
import {IntentMenuItem} from '../../components/IntentMenuItem'

const POPOVER_PROPS: PopoverProps = {
  constrainSize: true,
  placement: 'bottom',
  portal: true,
}

export function CreateMenuButton(props: {
  permissions: {granted: boolean; reason: string}[]
  items: MenuItemType[]
}) {
  const {items, permissions} = props

  return (
    <MenuButton
      button={<Button icon={ComposeIcon} mode="bleed" padding={3} />}
      id="create-menu"
      menu={
        <Menu>
          <Box paddingX={3} paddingTop={3} paddingBottom={2}>
            <Label muted>Create</Label>
          </Box>
          {items.map((createItem, createItemIndex) => (
            <IntentMenuItem
              disabled={!permissions[createItemIndex]?.granted}
              icon={createItem.icon}
              intent={createItem.intent!}
              key={createItemIndex}
              text={
                permissions[createItemIndex]?.granted
                  ? createItem.title
                  : permissions[createItemIndex]?.reason
              }
            />
          ))}
        </Menu>
      }
      popover={POPOVER_PROPS}
    />
  )
}
