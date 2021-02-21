import React, {useState} from 'react'
import {Col, Row} from "antd";
import Checkbox2 from "./Client/Checkbox2";
import {locations} from "./Data";

export default function Scenario() {
  const [Filters, setFilters] = useState({
    locations: [],
  })
  const handleFilters = (filters, category) => {
    const newFilters = {...Filters}
    newFilters[category] = filters
    setFilters(newFilters)
  }
  return (
      <section className="scenario">
        <h2 style={{fontSize:"34px"}}>Scenario</h2>
        <div className="scenarioText">
          Bạn muốn bật lò vi sóng trong phòng ăn ở tầng 1. Hãy nói yêu cầu trên bằng tiếng
          Việt ( có thể bằng 1 hoặc nhiều lần nói).
        </div>
      </section>

  )
}
