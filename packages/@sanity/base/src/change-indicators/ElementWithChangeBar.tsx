import React, {useCallback, useMemo, useState} from 'react'
import {ConnectorContext} from './ConnectorContext'

import {
  ChangeBarWrapper,
  FieldWrapper,
  ChangeBar,
  ChangeBarMarker,
  ChangeBarButton,
} from './ElementWithChangeBar.styled'

export function ElementWithChangeBar(props: {
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

  const changeBar = useMemo(
    () =>
      disabled ? null : (
        <ChangeBar>
          <ChangeBarMarker />

          <ChangeBarButton
            tabIndex={-1}
            type="button"
            aria-label="Review changes"
            onClick={isReviewChangesOpen ? undefined : onOpenReviewChanges}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </ChangeBar>
      ),
    [handleMouseEnter, handleMouseLeave, isReviewChangesOpen, onOpenReviewChanges, disabled]
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
      {changeBar}
    </ChangeBarWrapper>
  )
}
