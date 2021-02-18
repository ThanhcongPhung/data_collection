import React, { useState, useEffect } from 'react'
import { Checkbox, Collapse, Row, Col } from 'antd';

import LoadingComponent from './../../../Loading/LoadingComponent';
import { COLOR } from './../../../../Config';

const {Panel} = Collapse

export default function ClientCheckbox(props) {

  const list = props ? props.list : []
  const visible = props ? props.visible : true
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    if (list !== []) {
      setLoading(false);
    } else setLoading(true);
  }, [list])

  // update label for color criteria
  if(list) {
    if(list[4]) {
      if(list[4][2].toLowerCase() === 'màu') {
        list[5][1] = COLOR[list[5][2] + 1]
      }
    }
  }

  const getValueFromKey = (key) => {
    for (const item of list) {
      if (item[0] === key) return item[2]
    }

    return null
  }

  const onChange = (checkedValues) => {
    if (checkedValues.length === 0) {
      props.setIntent(null)
    } else {
      let intent = []
      checkedValues.map(key => {
        let temp = {
          key: key,
          value: getValueFromKey(key),
        }

        return intent.push(temp)
      })

      props.setIntent(intent)
    }
  }

  const renderList = (list) => {
    // item - 0 - key - 1 - label - 2 - value
    return list ? list.map(item => {
      return (
        <Col span={24/list.length} key={item[0]}>
          {/* I was thinking of assigning object to the checkbox value, but then there's no way for me to manipulate the way it compares 2 objects 
          so it can't be done. */}
          <Checkbox value={item[0]} disabled={!visible}>{item[1]}</Checkbox>  
        </Col>
      )
    }) : ""
  }

  if (loading) {
    return <LoadingComponent />
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
