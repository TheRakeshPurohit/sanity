/* eslint-disable react/no-unused-prop-types */

import React, {useMemo} from 'react'
import {Path} from '@sanity/types'
import {ScrollContainer} from '../../components/scroll'
import {Tracker, ConnectorContext} from '../'
import {ENABLED} from '../constants'
import {ConnectorsOverlay} from './ConnectorsOverlay'

interface Props {
  isReviewChangesOpen: boolean
  onOpenReviewChanges: () => void
  onSetFocus: (path: Path) => void
  className?: string
  children: React.ReactNode
}

function EnabledChangeConnectorRoot({
  children,
  className,
  onSetFocus,
  isReviewChangesOpen,
  onOpenReviewChanges,
}: Props) {
  const [rootRef, setRootRef] = React.useState<HTMLDivElement | null>()

  const contextValue = useMemo(
    () => ({
      isReviewChangesOpen,
      onOpenReviewChanges,
      onSetFocus,
    }),
    [isReviewChangesOpen, onOpenReviewChanges, onSetFocus],
  )

  return (
    <ConnectorContext.Provider value={contextValue}>
      <Tracker>
        <ScrollContainer ref={setRootRef} className={className}>
          {children}
          {rootRef && <ConnectorsOverlay rootRef={rootRef} onSetFocus={onSetFocus} />}
        </ScrollContainer>
      </Tracker>
    </ConnectorContext.Provider>
  )
}

function DisabledChangeConnectorRoot({children, className}: Props) {
  return <ScrollContainer className={className}>{children}</ScrollContainer>
}

export const ChangeConnectorRoot = ENABLED
  ? EnabledChangeConnectorRoot
  : DisabledChangeConnectorRoot
