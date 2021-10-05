import {
  HotkeyOptions,
  PortableTextBlock,
  PortableTextEditable,
  RenderAnnotationFunction,
  RenderBlockFunction,
  RenderChildFunction,
  RenderDecoratorFunction,
  EditorSelection,
  OnPasteFn,
  OnCopyFn,
  PortableTextEditor,
  usePortableTextEditor,
} from '@sanity/portable-text-editor'
import {Marker} from '@sanity/types'
import {Card, Container, useLayer} from '@sanity/ui'
import React, {useMemo, useEffect} from 'react'
import PatchEvent from '../../PatchEvent'
import Toolbar from './Toolbar/Toolbar'
import {RenderBlockActions, RenderCustomMarkers} from './types'
import Decorator from './Text/Decorator'

import {EditableWrapper, Root, Scroller, ToolbarCard} from './Editor.styles'

type Props = {
  initialSelection?: EditorSelection
  isFullscreen: boolean
  markers: Array<Marker>
  hotkeys: HotkeyOptions
  onBlur: () => void
  onCopy?: OnCopyFn
  onFocus: (Path) => void
  onFormBuilderChange: (change: PatchEvent) => void
  onPaste?: OnPasteFn
  onToggleFullscreen: () => void
  readOnly: boolean | null
  renderAnnotation: RenderAnnotationFunction
  renderBlock: RenderBlockFunction
  renderBlockActions?: RenderBlockActions
  renderChild: RenderChildFunction
  renderCustomMarkers?: RenderCustomMarkers
  setPortalElement?: (el: HTMLDivElement | null) => void
  setScrollContainerElement: (el: HTMLElement | null) => void
  value: PortableTextBlock[] | undefined
}

const renderDecorator: RenderDecoratorFunction = (mark, mType, attributes, defaultRender) => {
  return <Decorator mark={mark}>{defaultRender()}</Decorator>
}

function PortableTextSanityEditor(props: Props) {
  const {
    initialSelection,
    isFullscreen,
    // markers,
    onCopy,
    onFocus,
    onPaste,
    onToggleFullscreen,
    readOnly,
    renderAnnotation,
    renderBlock,
    // renderBlockActions,
    renderChild,
    setPortalElement,
    setScrollContainerElement,
    value,
  } = props

  const editor = usePortableTextEditor()
  const ptFeatures = useMemo(() => PortableTextEditor.getPortableTextFeatures(editor), [editor])
  const {isTopLayer} = useLayer()

  // TODO: Enable when we agree upon the hotkey for opening edit object interface when block object is focused
  //
  // const handleOpenObjectHotkey = (
  //   event: React.BaseSyntheticEvent,
  //   ptEditor: PortableTextEditor
  // ) => {
  //   const selection = PortableTextEditor.getSelection(ptEditor)
  //   if (selection) {
  //     event.preventDefault()
  //     event.stopPropagation()
  //     const {focus} = selection
  //     const activeAnnotations = PortableTextEditor.activeAnnotations(ptEditor)
  //     const focusBlock = PortableTextEditor.focusBlock(ptEditor)
  //     const focusChild = PortableTextEditor.focusChild(ptEditor)
  //     if (activeAnnotations.length > 0) {
  //       onFocus([
  //         ...focus.path.slice(0, 1),
  //         'markDefs',
  //         {_key: activeAnnotations[0]._key},
  //         FOCUS_TERMINATOR,
  //       ])
  //       return
  //     }
  //     if (focusChild && PortableTextEditor.isVoid(ptEditor, focusChild)) {
  //       onFocus([...focus.path, FOCUS_TERMINATOR])
  //       return
  //     }
  //     if (focusBlock && PortableTextEditor.isVoid(ptEditor, focusBlock)) {
  //       onFocus([...focus.path.slice(0, 1), FOCUS_TERMINATOR])
  //     }
  //   }
  // }

  const customFromProps: HotkeyOptions = useMemo(
    () => ({
      custom: {
        'mod+enter': props.onToggleFullscreen,
        // 'mod+o': handleOpenObjectHotkey, // TODO: disabled for now, enable when we agree on the hotkey
        ...(props.hotkeys || {}).custom,
      },
    }),
    [props.hotkeys, props.onToggleFullscreen]
  )

  const defaultHotkeys = useMemo(() => {
    const def = {marks: {}}

    ptFeatures.decorators.forEach((dec) => {
      switch (dec.value) {
        case 'strong':
          def.marks['mod+b'] = dec.value
          break
        case 'em':
          def.marks['mod+i'] = dec.value
          break
        case 'underline':
          def.marks['mod+u'] = dec.value
          break
        case 'code':
          def.marks["mod+'"] = dec.value
          break
        default:
        // Nothing
      }
    })

    return def
  }, [ptFeatures.decorators])

  const marksFromProps: HotkeyOptions = useMemo(
    () => ({
      marks: {
        ...defaultHotkeys.marks,
        ...(props.hotkeys || {}).marks,
      },
    }),
    [props.hotkeys, defaultHotkeys]
  )

  const hotkeys: HotkeyOptions = useMemo(
    () => ({
      ...marksFromProps,
      ...customFromProps,
    }),
    [marksFromProps, customFromProps]
  )

  // const hasMarkers = useMemo(() => markers.length > 0, [markers])

  useEffect(() => {
    if (!isTopLayer || !isFullscreen) return undefined

    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        event.stopPropagation()
        onToggleFullscreen()
      }
    }

    window.addEventListener('keydown', handleGlobalKeyDown)

    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown)
    }
  }, [isFullscreen, isTopLayer, onToggleFullscreen])

  const sanityEditor = useMemo(
    () => (
      <Root $fullscreen={isFullscreen} data-testid="pt-editor">
        <ToolbarCard data-testid="pt-editor__toolbar-card" shadow={1}>
          <Toolbar
            isFullscreen={isFullscreen}
            hotkeys={hotkeys}
            onFocus={onFocus}
            readOnly={readOnly}
            onToggleFullscreen={onToggleFullscreen}
          />
        </ToolbarCard>

        <Card flex={1} tone="transparent">
          <Scroller ref={setScrollContainerElement}>
            <Container padding={isFullscreen ? 2 : 0} sizing="border" width={1}>
              <EditableWrapper shadow={isFullscreen ? 1 : 0} sizing="border">
                <PortableTextEditable
                  hotkeys={hotkeys}
                  onCopy={onCopy}
                  onPaste={onPaste}
                  placeholderText={value ? undefined : 'Empty'}
                  renderAnnotation={renderAnnotation}
                  renderBlock={renderBlock}
                  renderChild={renderChild}
                  renderDecorator={renderDecorator}
                  selection={initialSelection}
                  spellCheck
                />
              </EditableWrapper>
            </Container>
          </Scroller>

          <div data-portal="" ref={setPortalElement} />
        </Card>
      </Root>
    ),
    [
      hotkeys,
      initialSelection,
      isFullscreen,
      onCopy,
      onFocus,
      onPaste,
      onToggleFullscreen,
      readOnly,
      renderAnnotation,
      renderBlock,
      renderChild,
      setPortalElement,
      setScrollContainerElement,
      value,
    ]
  )

  return sanityEditor
}

export default PortableTextSanityEditor
