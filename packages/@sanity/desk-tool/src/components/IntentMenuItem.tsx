import {IntentLink} from '@sanity/base/router'
import {MenuItem, MenuItemProps} from '@sanity/ui'
import React, {forwardRef, useMemo} from 'react'
import {RouterIntent} from '../types'

export const IntentMenuItem = forwardRef(function IntentMenuItem(
  props: {intent: RouterIntent} & Omit<MenuItemProps, 'as' | 'href'> & {disabled: boolean},
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const {intent, ...restProps} = props
  const intentType = intent.type
  const params = useMemo(() => intent.params || {}, [intent.params])

  const Link = useMemo(
    () =>
      // eslint-disable-next-line @typescript-eslint/no-shadow
      forwardRef(function Link(
        linkProps: {children: React.ReactNode},
        linkRef: React.ForwardedRef<HTMLAnchorElement>
      ) {
        return <IntentLink {...linkProps} intent={intentType} params={params} ref={linkRef} />
      }),
    [intentType, params]
  )

  const hoverTitle = props.text?.toString()
  return props.disabled ? (
    <MenuItem {...restProps} title={hoverTitle} as="a" data-as="as" aria-disabled="true" />
  ) : (
    <MenuItem {...restProps} title={hoverTitle} as={Link} data-as="a" ref={ref} />
  )
})
