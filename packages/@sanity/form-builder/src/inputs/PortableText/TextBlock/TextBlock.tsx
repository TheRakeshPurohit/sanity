import React, {useMemo} from 'react'
import {Box, rem, Theme} from '@sanity/ui'
import styled, {css} from 'styled-components'
import {
  BlockQuote,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Normal,
} from './textStyles'

export interface TextBlockProps {
  children: React.ReactNode
  hasErrors?: boolean
  level?: number
  listItem?: 'bullet' | 'number'
  style?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'normal' | 'blockquote'
}
interface _TextBlockStyleProps {
  $level?: number
  $listItem?: 'bullet' | 'number'
  $size: number
  $style: 'heading' | 'text'
}

const Root = styled(Box)<_TextBlockStyleProps>(_textBlockStyle)

export const TEXT_STYLES = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  h5: Heading5,
  h6: Heading6,
  normal: Normal,
  blockquote: BlockQuote,
}

const TEXT_STYLES_KEYS = Object.keys(TEXT_STYLES)

const HEADER_STYLES = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

const HEADER_SIZES: {[key: string]: number | undefined} = {
  h1: 4,
  h2: 3,
  h3: 2,
  h4: 1,
  h5: 0,
  h6: 0,
}

const BULLET_MARKERS = ['●', '○', '■']

function getBulletMarker(level: number, listItem: 'bullet' | 'number') {
  if (listItem === 'bullet' && typeof level === 'number') {
    return BULLET_MARKERS[(level - 1) % BULLET_MARKERS.length]
  }

  /**
   * 1 - number
   * 2 - letter
   * 3 - roman
   * 4 - number
   * 5 - letter
   * 6 - roman
   * 7 - number
   * 8 - letter
   * 9 - roman
   */

  if (listItem === 'number' && typeof level === 'number') {
    return `${level}`
  }

  return undefined
}

function _textBlockStyle(props: _TextBlockStyleProps & {theme: Theme}) {
  const {
    $level,
    $listItem,
    // $size, $style,
    theme,
  } = props
  const {space} = theme.sanity
  // const font = theme.sanity.fonts[$style]
  // const fontSize = font.sizes[$size || 2]
  const indent = typeof $level === 'number' ? space[4] * $level : undefined

  const bulletMarker = getBulletMarker($level, $listItem)

  return css`
    --text-block-marker: ${bulletMarker && `'${bulletMarker}'`};
    --text-block-indent: ${indent ? rem(space[3] + space[3] + indent) : undefined};

    margin-left: var(--text-block-indent);

    & > [data-ui='TextBlock__text'] {
      position: relative;
      text-transform: none;
      white-space: pre-wrap;
      overflow-wrap: anywhere;
      display: flex;
      align-items: center;

      ${$listItem &&
      css`
        &:before {
          content: var(--text-block-marker);
          margin-right: 1rem;
          font-size: 1em;
        }
      `}
    }
  `
}

export function TextBlock(props: TextBlockProps): React.ReactElement {
  const {children, level, listItem, style} = props

  const {$size, $style} = useMemo((): {$size: number; $style: 'text' | 'heading'} => {
    if (HEADER_STYLES.includes(style)) {
      return {$style: 'heading', $size: HEADER_SIZES[style]}
    }

    return {$size: 2, $style: 'text'}
  }, [style])

  const text = useMemo(() => {
    const hasTextStyle = TEXT_STYLES_KEYS.includes(style)

    if (hasTextStyle) {
      const TextComponent = TEXT_STYLES[style]

      return (
        <div data-ui="TextBlock__text">
          <TextComponent>{children}</TextComponent>
        </div>
      )
    }

    return <div data-ui="TextBlock__text">{children}</div>
  }, [style, children])

  const paddingProps = useMemo(() => {
    if (listItem) {
      return {paddingY: 2}
    }

    switch (style) {
      case 'h1': {
        return {paddingTop: 5, paddingBottom: 2}
      }
      case 'h2': {
        return {paddingTop: 4, paddingBottom: 2}
      }
      case 'h3': {
        return {paddingTop: 3, paddingBottom: 2}
      }
      case 'h4': {
        return {paddingTop: 3, paddingBottom: 2}
      }
      case 'h5': {
        return {paddingTop: 3, paddingBottom: 2}
      }
      case 'h6': {
        return {paddingTop: 3, paddingBottom: 2}
      }
      case 'normal': {
        return {paddingY: 2}
      }
      case 'blockquote': {
        return {paddingY: 2}
      }
      default: {
        return {paddingY: 2}
      }
    }
  }, [listItem, style])

  return (
    <Root
      $level={level}
      $listItem={listItem}
      $size={$size}
      $style={$style}
      data-level={level}
      data-list-item={listItem}
      data-style={$style}
      data-ui="TextBlock"
      {...paddingProps}
    >
      {text}
    </Root>
  )
}
