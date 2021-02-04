import React from 'react'
import {Collapse, Select} from 'antd';

const {Panel} = Collapse;
const {Option} = Select;

function Dropdown(props) {
  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  const renderDropdownList = () => props.list && props.list.map((value, index) => (
      <React.Fragment key={index}>
        <Select defaultValue={value.name} style={{width: 120}} onChange={handleChange}>
          {value.content && value.content.map((item) =>
              <Option value={item.value}>{item.value}</Option>)}
        </Select>&nbsp;&nbsp;&nbsp;&nbsp;
      </React.Fragment>
  ))
  return (
        <Collapse defaultActiveKey={['1']}>
          <Panel header="Thông tin nghe được trong câu nói của Client: " key="1">
            {renderDropdownList()}
          </Panel>
        </Collapse>
  )
}

export default Dropdown
