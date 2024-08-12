import { Button as AntdButton } from 'antd'
import { registerComponents } from '../context'

export function Button(props: any) {
  const { text, ...rest } = props
  return <AntdButton type="primary" {...rest} >{text}</AntdButton>
}

registerComponents('button', Button)
