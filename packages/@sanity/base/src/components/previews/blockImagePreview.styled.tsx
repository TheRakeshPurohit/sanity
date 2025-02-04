import {Box} from '@sanity/ui'
import styled from 'styled-components'

export const MediaWrapper = styled(Box)`
  position: relative;
  flex: 1;

  img {
    display: block;
    width: 100%;
    height: auto;
    pointer-events: none;
  }

  svg {
    display: block;
    width: calc(2.5rem + 1px) !important;
    height: calc(2.5rem + 1px) !important;
    margin: 0.5rem;
  }
`

export const Root = styled(Box)`
  user-select: none;
  width: 100%;
`

export const MetadataWrapper = styled(Box)`
  user-select: none;
  width: 100%;

  ${MediaWrapper} + &:empty {
    display: none;
  }
`
