import React, {useState} from 'react'
import {Col, Row} from "antd";
import Checkbox2 from "./Client/Checkbox2";

import { COLOR } from './../../../Config';

export default function Scenario(props) {
  
  const scenario = props ? props.scenario : [];
  const progress = props ? props.progress : [];

  const [Filters, setFilters] = useState({
    locations: [],
  })
  const handleFilters = (filters, category) => {
    const newFilters = {...Filters}
    newFilters[category] = filters
    setFilters(newFilters)
  }

  const generateScript = () => {
    if (scenario && scenario.length >= 4) { 
      return `Bạn muốn ${scenario[0][2].toLowerCase()} ${scenario[1][2].toLowerCase()} trong ${scenario[3][2].toLowerCase()} ở tầng ${scenario[2][2]} ${generateAction()}. Bạn hãy mô tả yêu cầu trên bằng tiếng Việt ( có thể bằng 1 hoặc nhiều lần nói).`
    }
    
    return ''
  }

  const generateAction = () => {
    if (scenario) {
      if (scenario.length > 4) {
        switch(scenario[4][2].toLowerCase()) {
        case "độ sáng":
        case "âm lượng": 
          return `với ${scenario[4][2].toLowerCase()} ở mức ${scenario[5][2]}%`
        case "màu":
          return `với ${scenario[4][2].toLowerCase()} ${COLOR[scenario[5][2]].toLowerCase()}`
        case "kênh":
        case "mức":
          return `tại ${scenario[4][2].toLowerCase()} ${scenario[5][2]}`
        case "nhiệt độ":
          return `với ${scenario[4][2].toLowerCase()} tại ${scenario[5][2]} độ`
        case "thời gian hẹn giờ":
          return `và hẹn giờ trong ${scenario[5][2]} tiếng`
        default:
          return `với ${scenario[4][2].toLowerCase()} ở mức ${scenario[5][2]}`
        }
        
      }

      return ''
    }

    return ''
  }

  return (
      <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"stretch"}}>
        <Row style={{borderLeft:"1px solid",height:"100%",borderColor:"white",backgroundColor:"white"}}>
          <h3 style={{fontWeight:'bold',fontSize:'18px',textAlign: "center"}}>Kịch bản hội thoại</h3>
          <Col span={24} style={{fontSize:"15px",marginTop:"auto"}}>
            {generateScript()}
          </Col>
          <Col span={24}>
            <Checkbox2
              list={scenario}
              progress={progress}
              handleFilters={filters => handleFilters(filters, "locations")}
            />
          </Col>
        </Row>
      </div>
  )
}
