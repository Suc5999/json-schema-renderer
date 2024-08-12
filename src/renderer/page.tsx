import { INode } from '../types'
import { RendererContext, useRendererContext } from './context'
import { NodeContainer, components, getComponent, ComponentsContext } from '../components'
import { registerGlobalApi } from './utils'
import { Form } from 'antd'

export interface RendererPageProps {
  pageBody: INode[];
}

registerGlobalApi();

export function RendererPage(props: RendererPageProps) {
  const { pageBody } = props

  const rendererContext = useRendererContext(pageBody)
  const { jsonSchema } = rendererContext

  return <ComponentsContext.Provider value={{ components, getComponent }}>
    <RendererContext.Provider value={rendererContext}>
      {
        jsonSchema.length > 0 && jsonSchema.map((node) => <NodeContainer key={node.uuid} node={node} />)
      }
    </RendererContext.Provider>
  </ComponentsContext.Provider>
}