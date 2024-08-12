import { Input, Form } from 'antd'
import { registerComponents } from '../context'

export function Text(props: any) {
  const { onChange, label, ...rest } = props
  return <Form.Item label={label}>
    <Input {...rest} onChange={(e) => onChange(e.target.value)} />
  </Form.Item>
}

registerComponents('text', Text)
