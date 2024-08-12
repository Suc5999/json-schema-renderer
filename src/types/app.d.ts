
/**
 * 组件节点类型声明
*/
export interface INode {
  /** 节点 UUID */
  readonly uuid: string;
  /** 属性名称 */
  name: string;
  /** 组件名称 */
  componentName: string;
  /** 事件列表 */
  events: Array<Record<string, string>>;
  /** 标签 */
  label?: string;
  /** 校验规则 */
  rules?: Array<Record<string, any>>;
  /** 内容 */
  text?: string;
  /** 输入类型的值 */
  value?: any
}

export interface IRuntimeNode extends Omit<INode, 'events'> {
  /** 包装后的事件 */
  events: Record<string, Function>
  /** 更新数据 */
  updateJson?: (data: IRuntimeNode) => void
}

/**
 * 节点事件
 */
export interface INodeEvent {
  type: any
}

type InternalRules = 'require' | 'max' | 'min' | 'email'
type Rule = Record<InternalRules | string, any>
/**
 * 表单属性
 */
export interface IFormProps {
  rules?: Rule[]
}