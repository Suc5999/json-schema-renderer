import { INode, IRuntimeNode } from "../types";
import { formateEventName } from "../utils";
import { createSandBox, registerSandboxContext } from "./sandbox";
import { message } from 'antd'

/**
 * 创建运行时节点数据
 */
export function createRuntimeNode(node: INode, getSchemaMap: any): IRuntimeNode {
  const events: Record<string, Function> = {}
  if (Array.isArray(node.events)) {
    node.events.forEach(event => {
      const eventNames = Object.keys(event)
      eventNames.forEach(name => {
        events[formateEventName(name)] = createSandBox(event[name], getSchemaMap)
      })
    })
  }

  const rules = []
  if (Array.isArray(node.rules)) {
    
  }

  return {
    ...node,
    events
  }
}

/**
 * 注册全局 API
 */
export function registerGlobalApi() {
  // TODO 演示，最好更具 api 类型，增加命名空间
  registerSandboxContext({
    message
  })
}