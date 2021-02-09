import React from 'react'
import { Checkbox, Collapse, Row, Col } from 'antd';

const {Panel} = Collapse

function CheckBox(props) {

  const list = props ? props.list : []

  const onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
  }

  const renderList = () => {
    // item - 0 - key - 1 - label - 2 - value
    return list ? list.map(item => {
      console.log(item[0]+'.'+item[1])
      return (
        <Col span={6} key={item[0]+'.'+item[1]}>
          <CheckBox value={item[2]} key={item[0]}>{item[1]}</CheckBox>  
        </Col>
      )
    }) : ""
  }
  

  return (
    <>
      <Collapse defaultActiveKey={['1']}>
        <Panel header="Xác nhận câu lệnh: " key="1">
          
        </Panel>
      </Collapse>

      <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
        <Row>
          {renderList}
        </Row>
      </Checkbox.Group>
    </>
  )
  // const [Checked, setChecked] = useState([])

  // const handleToggle = (value) => {

  //   const currentIndex = Checked.indexOf(value);
  //   const newChecked = [...Checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value)
  //   } else {
  //     newChecked.splice(currentIndex, 1)
  //   }

  //   setChecked(newChecked)
  //   props.handleFilters(newChecked)
  //   //update this checked information into Parent Component

  // }

  // const renderCheckboxLists = () => props.list && props.list.map((value, index) => (
  //     <React.Fragment key={index}>
  //       <Checkbox
  //           onChange={() =>{
  //             if(props.uncheck===false){
  //               handleToggle(value.name)
  //             }else {
  //               setChecked([])
  //               handleToggle(value.name)
  //             }
  //           }}
  //           type="checkbox"
  //           checked={Checked.indexOf(value.name) === -1 ? false : true}
  //       />&nbsp;&nbsp;
  //       <span>{value.name}</span>
  //     </React.Fragment>
  // ))

  // return (
    // <Collapse defaultActiveKey={['1']}>
    //   <Panel header="Xác nhận câu lệnh: " key="1">
    //     {renderCheckboxLists()}
    //   </Panel>
    // </Collapse>
  // )
}

export default CheckBox
