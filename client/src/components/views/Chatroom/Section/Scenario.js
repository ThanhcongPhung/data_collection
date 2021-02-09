import React, {useState} from 'react'
import {Col, Row} from "antd";
import Checkbox2 from "./Client/Checkbox2";

export default function Scenario(props) {
  
  const scenario = props ? props.scenario : [];

  const [Filters, setFilters] = useState({
    locations: [],
  })
  const handleFilters = (filters, category) => {
    const newFilters = {...Filters}
    newFilters[category] = filters
    setFilters(newFilters)
  }
  return (
      <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"stretch"}}>
        <Row style={{borderLeft:"1px solid",height:"100%",borderColor:"white",backgroundColor:"white"}}>
          <h3 style={{fontWeight:'bold',fontSize:'18px',textAlign: "center"}}>Kịch bản hội thoại</h3>
          <Col span={24} style={{fontSize:"15px",marginTop:"auto"}}>Bạn muốn bật lò vi sóng trong phòng ăn ở tầng 1. Hãy nói yêu cầu trên bằng tiếng
            Việt ( có thể bằng 1 hoặc nhiều lần nói).</Col>
          <Col span={24}>
            <Checkbox2
              list={scenario}
              handleFilters={filters => handleFilters(filters, "locations")}
            />
          </Col>
        </Row>
      </div>
  )
}
