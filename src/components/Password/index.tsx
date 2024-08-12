import { Input, Form } from 'antd'
import { registerComponents } from '../context'

export function Password(props: any) {
  const { onChange, label, ...rest } = props
  return <Form.Item label={label} >
    <Input.Password {...rest} onChange={(e) => onChange(e.target.value)} />
  </Form.Item>
}

registerComponents('password', Password)
