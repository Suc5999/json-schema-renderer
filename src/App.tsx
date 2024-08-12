import { useState, ChangeEvent } from 'react';
import NodeJson from './mock/schema.json'
import { RendererPage } from './renderer'
import { INode } from './types'
import { message, Row, Col, Input, Button } from 'antd'

function AppEntry() {
  const [loading, setLoading] = useState<boolean>(true)
  const [jsonDataStr, setJsonDataStr] = useState<string>(JSON.stringify(NodeJson, null, 4));
  const [pageBody, setPageBody] = useState<INode[]>([])


  const onJsonDataChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setJsonDataStr(event.target.value)
  }

  const onJsonSchemaConfirm = () => {
    try {
      const json: INode[] = JSON.parse(jsonDataStr)
      setPageBody(json)
    } catch (err) {
      console.log(message, typeof message.error)
      message.error(`JSON 数据解析失败: ${err}`)
    }
  }

  return (
    <div className="App">
      <Row className="container">
        <Col span={12} style={{ padding: '24px' }}>
          <Input.TextArea
            autoSize={{ minRows: 10, maxRows: 26 }}
            value={jsonDataStr}
            onChange={onJsonDataChange}
          />
          <Button type='primary' onClick={onJsonSchemaConfirm} >确认修改</Button>
        </Col>
        <Col span={12} style={{ padding: '24px' }}>
          <RendererPage pageBody={pageBody} />
        </Col>
      </Row>
    </div>
  );
}

export default AppEntry;
