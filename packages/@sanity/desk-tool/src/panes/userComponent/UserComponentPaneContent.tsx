import React from 'react'
import {usePane} from '../../components'

interface UserComponentPaneContentProps {
  children: React.ReactNode
}

export function UserComponentPaneContent(props: UserComponentPaneContentProps) {
  const {children} = props
  const {collapsed} = usePane()

  if (collapsed) {
    return null
  }

  return <>{children}</>
}
