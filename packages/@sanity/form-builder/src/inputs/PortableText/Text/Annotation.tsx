/* eslint-disable react/prop-types */
import React, {FunctionComponent, SyntheticEvent} from 'react'
import classNames from 'classnames'
import {PortableTextChild, RenderAttributes} from '@sanity/portable-text-editor'

import {FOCUS_TERMINATOR} from '@sanity/util/paths'
import {Path, Marker, isValidationErrorMarker} from '@sanity/types'

import styles from './Annotation.module.css'

type Props = {
  value: PortableTextChild
  children: JSX.Element
  attributes: RenderAttributes
  markers: Marker[]
  onFocus: (path: Path) => void
}

export const Annotation: FunctionComponent<Props> = ({
  children,
  markers,
  attributes: {focused, selected, path},
  value,
  onFocus,
}) => {
  const errors = markers.filter(isValidationErrorMarker)
  const classnames = classNames([
    styles.root,
    focused && styles.focused,
    selected && styles.selected,
    errors.length > 0 ? styles.error : styles.valid,
  ])

  const markDefPath = [...path.slice(0, 1), 'markDefs', {_key: value._key}]

  const handleOpen = (event: SyntheticEvent<HTMLSpanElement>): void => {
    event.preventDefault()
    event.stopPropagation()
    onFocus(markDefPath.concat(FOCUS_TERMINATOR))
  }
  return (
    <span className={classnames} onClick={handleOpen}>
      {children}
    </span>
  )
}
