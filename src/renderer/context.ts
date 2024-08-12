import { createContext, useCallback, useEffect, useState, useRef } from "react";
import { IRuntimeNode, INode } from "../types";
import { createRuntimeNode } from "./utils";
import { registerSandboxContext } from "./sandbox";

/**
 * JSON 数据
*/
interface IRendererContext {
  jsonSchema: IRuntimeNode[];
  /* Json Map */
  jsonMap: Record<string, IRuntimeNode>;
  getJsonMap: () => Record<string, IRuntimeNode> | undefined
  /* 获取节点 JSON 数据 */
  getNodeJsonData: (name: string) => IRuntimeNode;
  /* 更新节点数据 */
  updateJsonData: (data: IRuntimeNode) => void;
}

export const RendererContext = createContext<IRendererContext>({} as IRendererContext)

export function useRendererContext(jsonTree: INode[]) {
  const [jsonSchema, setJsonSchema] = useState<IRuntimeNode[]>([]);
  const [jsonMap, setJsonMap] = useState<Record<string, IRuntimeNode>>({});
  const jsonMapRef = useRef<Record<string, IRuntimeNode>>();

  const updateJsonData = useCallback((data: IRuntimeNode) => {
    setJsonMap((jsons) => {
      if (jsons[data.name]) {
        jsons[data.name] = data
      }
      jsonMapRef.current = jsons
      return jsons
    })
  }, [])

  const getNodeJsonData = useCallback((name: string) => {
    return jsonMap[name] || {}
  }, [jsonMap])

  const getJsonMap = useCallback(() => {
    return jsonMapRef.current
  }, [])

  useEffect(() => {
    const jsonSchemaMap: Record<string, IRuntimeNode> = {}
    const runtimeSchemas: IRuntimeNode[] = []
    jsonTree.forEach((node) => {
      const runtimeSchema = createRuntimeNode(node, getJsonMap)
      runtimeSchema.updateJson = updateJsonData
      runtimeSchemas.push(runtimeSchema)
      jsonSchemaMap[runtimeSchema.name] = runtimeSchema
    })
    setJsonMap(jsonSchemaMap)
    setJsonSchema(runtimeSchemas)
    registerSandboxContext(jsonSchemaMap)
  }, [jsonTree])

  return {
    jsonMap,
    jsonSchema,
    getJsonMap,
    updateJsonData,
    getNodeJsonData
  }
}
