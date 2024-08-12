import { createContext, ComponentType } from "react"

/**
 * 组件集合
*/
interface IComponentsContext {
  /* 组件集合 */
  components: Record<string, ComponentType>;
  /* 获取组件 */
  getComponent: (name: string) => ComponentType | undefined
}

export const components: Record<string, ComponentType> = {};

export const getComponent = (name: string) => {
  if (!components[name]) {
    console.warn('[getComponent error]: Component not registered')
    return
  }
  return components[name]
}

export const registerComponents = (name: string, component: ComponentType<any>) => {
  if (components[name]) {
    console.warn('[registerComponents warning]: Component has registered')
    return
  }
  components[name] = component
}

export const ComponentsContext = createContext<IComponentsContext>({} as IComponentsContext)
