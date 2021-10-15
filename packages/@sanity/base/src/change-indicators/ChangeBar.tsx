import {Box, Text, Tooltip} from '@sanity/ui'
import React, {useCallback, useMemo, useState} from 'react'
import {ConnectorContext} from './ConnectorContext'

import {
  ChangeBarWrapper,
  FieldWrapper,
  TooltipTriggerWrapper,
  BarWrapper,
  BadgeWrapper,
  ShapeWrapper,
  ButtonWrapper,
} from './ChangeBar.styled'

export function ChangeBar(props: {
  children: React.ReactNode
  hasFocus: boolean
  isChanged: boolean
  disabled?: boolean
}) {
  const {children, hasFocus, isChanged, disabled} = props

  const [hover, setHover] = useState(false)
  const {onOpenReviewChanges, isReviewChangesOpen} = React.useContext(ConnectorContext)

  const handleMouseEnter = useCallback(() => setHover(true), [])
  const handleMouseLeave = useCallback(() => setHover(false), [])

  const tooltip = useMemo(
    () =>
      disabled ? null : (
        <TooltipTriggerWrapper>
          <BarWrapper />

          <BadgeWrapper>
            <ShapeWrapper />
          </BadgeWrapper>

          <ButtonWrapper
            tabIndex={isReviewChangesOpen || !isChanged ? -1 : 0}
            type="button"
            aria-label="Review changes"
            onClick={isReviewChangesOpen ? undefined : onOpenReviewChanges}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </TooltipTriggerWrapper>
      ),
    [
      handleMouseEnter,
      handleMouseLeave,
      isReviewChangesOpen,
      onOpenReviewChanges,
      isChanged,
      disabled,
    ]
  )

  return (
    <ChangeBarWrapper
      focus={hasFocus}
      hover={hover}
      changed={isChanged}
      isReviewChangeOpen={isReviewChangesOpen}
      disabled={disabled}
    >
      <FieldWrapper>{children}</FieldWrapper>
      {tooltip}
    </ChangeBarWrapper>
  )
}
