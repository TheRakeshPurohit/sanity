import {type Tool, useClient, usePerspective} from 'sanity'

import {DEFAULT_API_VERSION} from './apiVersions'
import {VisionContainer} from './containers/VisionContainer'
import {VisionErrorBoundary} from './containers/VisionErrorBoundary'
import {type VisionConfig} from './types'

interface SanityVisionProps {
  tool: Tool<VisionConfig>
}

function SanityVision(props: SanityVisionProps) {
  const client = useClient({apiVersion: '1'})
  const perspective = usePerspective()
  const config: VisionConfig = {
    defaultApiVersion: DEFAULT_API_VERSION,
    ...props.tool.options,
  }

  return (
    <VisionErrorBoundary>
      <VisionContainer client={client} config={config} pinnedPerspective={perspective} />
    </VisionErrorBoundary>
  )
}

export default SanityVision
