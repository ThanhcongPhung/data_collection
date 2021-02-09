import React from 'react'
import { Checkbox, Collapse, Row, Col } from 'antd';

const {Panel} = Collapse

export default function ClientCheckbox(props) {

  const list = props ? props.list : []

  const onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
  }

  const renderList = (list) => {
    // item - 0 - key - 1 - label - 2 - value
    return list ? list.map(item => {
      return (
        <Col span={24/list.length} key={item[0]}>
          <Checkbox value={item[2]}>{item[1]}</Checkbox>  
        </Col>
      )
    }) : ""
  }

  return (
    <>
      <Collapse defaultActiveKey={['1']}>
        <Panel header="Xác nhận câu lệnh: " key="1">
          <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
            <Row>
              {renderList(list)}
            </Row>
          </Checkbox.Group>
        </Panel>
      </Collapse>
    </>
  )
}
