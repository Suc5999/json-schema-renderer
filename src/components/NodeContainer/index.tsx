import { useContext, createElement } from 'react';
import { ComponentsContext } from '../context';
import { IRuntimeNode } from '../../types';

interface NodeContainerProps {
  node: IRuntimeNode
}

export function NodeContainer(props: NodeContainerProps) {
  const { node } = props
  const { updateJson, events = {}, ...rest } = node
  const { getComponent } = useContext(ComponentsContext)

  const NodeComp = getComponent(node.componentName)

  if (!NodeComp) {
    return null
  }

  const onChange = (value: any) => {
    updateJson?.({...node, value})
  }

  // @ts-ignore
  return <NodeComp {...rest} {...events} onChange={onChange} />
}