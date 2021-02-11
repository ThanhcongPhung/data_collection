import React, { useState } from 'react'
import { Collapse, Select, InputNumber, Row, Col } from 'antd';

import { COLOR } from '../../../../Config';

const {Panel} = Collapse;
const {Option} = Select;

const deviceData = ['Quạt', 'Quạt thông gió', 'Tivi', 'Loa', 'Đèn bàn', 'Đèn trần', 'Đèn cầu thang', 'Bình nóng lạnh', 'Điều hòa', 'Lò sưởi', 'Cổng', 'Lò nướng', 'Bếp'];
const roomData = {
  'Quạt': ['Phòng khách', 'Phòng ăn', 'Phòng bếp', 'Phòng ngủ', 'Phòng vệ sinh', 'Phòng làm việc', 'Phòng tắm'],
  'Quạt thông gió': ['Phòng khách', 'Phòng ăn', 'Phòng bếp', 'Phòng ngủ', 'Phòng vệ sinh', 'Phòng làm việc', 'Phòng tắm'],
  'Tivi': ['Phòng khách', 'Phòng ăn', 'Phòng ngủ', 'Phòng làm việc'],
  'Loa': ['Phòng khách', 'Phòng ăn', 'Phòng ngủ', 'Phòng làm việc'],
  'Đèn bàn': ['Phòng khách', 'Phòng ngủ', 'Phòng làm việc'],
  'Đèn trần': ['Phòng khách', 'Phòng ăn', 'Phòng bếp', 'Phòng ngủ', 'Phòng vệ sinh', 'Phòng làm việc', 'Phòng tắm'],
  'Đèn cầu thang': ['Cầu thang'],
  'Bình nóng lạnh': ['Phòng khách', 'Phòng bếp', 'Phòng vệ sinh', 'Phòng tắm'],
  'Điều hòa': ['Phòng khách', 'Phòng ăn', 'Phòng bếp', 'Phòng ngủ', 'Phòng làm việc'],
  'Lò sưởi': ['Phòng khách', 'Phòng ăn', 'Phòng bếp', 'Phòng ngủ', 'Phòng làm việc'],
  'Cổng': ['Vườn', 'Garage'],
  'Lò nướng': ['Phòng bếp'],
  'Bếp': ['Phòng bếp'],
};
const floorData = ['Tầng 1', 'Tầng 2', 'Tầng 3', 'Tầng 4'];
const actionData = {
  'Quạt': ['Bật', 'Tắt', 'Tăng', 'Giảm', 'Đặt', 'Kiểm tra'],
  'Quạt thông gió': ['Bật', 'Tắt', 'Kiểm tra'],
  'Tivi': ['Bật', 'Tắt', 'Tăng', 'Giảm', 'Đặt', 'Kiểm tra'],
  'Loa': ['Bật', 'Tắt', 'Tăng', 'Giảm', 'Đặt', 'Kiểm tra'],
  'Đèn bàn': ['Bật', 'Tắt', 'Tăng', 'Giảm', 'Đặt', 'Kiểm tra'],
  'Đèn trần': ['Bật', 'Tắt', 'Đặt', 'Kiểm tra'],
  'Đèn cầu thang': ['Bật', 'Tắt', 'Kiểm tra'],
  'Bình nóng lạnh': ['Bật', 'Tắt', 'Kiểm tra'],
  'Điều hòa': ['Bật', 'Tắt', 'Tăng', 'Giảm', 'Đặt', 'Kiểm tra'],
  'Lò sưởi': ['Bật', 'Tắt', 'Kiểm tra'],
  'Cổng': ['Mở', 'Đóng', 'Kiểm tra'],
  'Lò nướng': ['Bật', 'Tắt', 'Tăng', 'Giảm', 'Đặt', 'Kiểm tra'],
  'Bếp': ['Bật', 'Tắt', 'Tăng', 'Giảm', 'Đặt', 'Kiểm tra'],
};
const scaleData = {
  'Quạt': ['Mức', 'Không có'],
  'Quạt thông gió': ['Không có'],
  'Tivi': ['Kênh', 'Âm lượng', 'Không có'],
  'Loa': ['Âm lượng', 'Không có'],
  'Đèn bàn': ['Độ sáng', 'Không có'],
  'Đèn trần': ['Màu', 'Không có'],
  'Đèn cầu thang': ['Không có'],
  'Bình nóng lạnh': ['Không có'],
  'Điều hòa': ['Nhiệt độ', 'Thời gian hẹn giờ', 'Không có'],
  'Lò sưởi': ['Không có'],
  'Cổng': ['Không có'],
  'Lò nướng': ['Nhiệt độ', 'Thời gian hẹn giờ', 'Không có'],
  'Bếp': ['Nhiệt độ', 'Thời gian hẹn giờ', 'Không có'],
};

export default function ServantDropDown(props) {

  const [ roomList, setRoomList ] = useState(roomData[deviceData[0]]);
  const [ selectedRoom, setSelectedRoom ] = useState(roomData[deviceData[0]][0]);
  
  const [ selectedFloor, setSelectedFloor ] = useState(floorData[0]);

  const [ actionList, setActionList ] = useState(actionData[deviceData[0]]);
  const [ selectedAction, setSelectedAction ] = useState(actionData[deviceData[0]][0]);

  const [ scaleList, setScaleList ] = useState(scaleData[deviceData[0]]);
  const [ selectedScale, setSelectedScale ] = useState(scaleData[deviceData[0]][0]);

  const [ level, setLevel ] = useState('')

  const handleDeviceChange = (value) => {
    setRoomList(roomData[value]);
    setSelectedRoom(roomData[value][0]);

    setActionList(actionData[value]);
    setSelectedAction(actionData[value][0]);

    setScaleList(scaleData[value]);
    setSelectedScale(scaleData[value][0]);

    // console.log(`selectedScale === "Màu" ? ${selectedScale} ${selectedScale === "Màu"}`)
    if(value === "Đèn trần") {
      setLevel(COLOR[0])
    } else {
      setLevel('')
    }
  }

  const onSelectedRoomChange = (value) => {
    console.log(value)
    setSelectedRoom(value);
  }

  const onSelectedFloorChange = (value) => {
    console.log(value)
    setSelectedFloor(value)
  }

  const onSelectedActionChange = (value) => {
    console.log(value)
    setSelectedAction(value);
  }

  const onSelectedScaleChange = (value) => {
    console.log(value)
    setSelectedScale(value)
  }

  const onSelectedLevelChange = (value) => {
    console.log(value)
    setLevel(value)
  }

  // const marginRight = "5px";

  return (
    <Collapse defaultActiveKey={['1']}>
      <Panel header="Thông tin nghe được trong câu nói của Client: " key="1">
        <Row>
          <Col span={5}>
            <Select 
              defaultValue={deviceData[0]} 
              style={{ width: 150 }} 
              onChange={handleDeviceChange}>
              {
                deviceData.map(device => (
                  <Option key={device}>{device}</Option>
                ))
              }
            </Select>
          </Col>
          <Col span={5}>
            <Select 
              value={selectedRoom}
              style={{ width: 150 }} 
              onChange={onSelectedRoomChange}>
              {
                roomList.map(room => (
                  <Option key={room}>{room}</Option>
                ))
              }
            </Select>
          </Col>
          <Col span={3}>
            <Select
              value={selectedFloor}
              style={{ with: 100 }}
              onChange={onSelectedFloorChange}>
              {
                floorData.map(floor => (
                  <Option key={floor}>{floor}</Option>
                ))
              }
            </Select>
          </Col>
          <Col span={3}>
            <Select
              value={selectedAction}
              style={{ width: 90 }}
              onChange={onSelectedActionChange}>
              {
                actionList.map(action => (
                  <Option key={action}>{action}</Option>
                ))
              }
            </Select>
          </Col>
          <Col span={5}>
            <Select
              value={selectedScale}
              style={{ width: 150 }}
              onChange={onSelectedScaleChange}>
              {
                scaleList.map(scale => (
                  <Option key={scale}>{scale}</Option>
                ))
              }
            </Select>
          </Col>
          <Col span={3}>
            {
              selectedScale === "Màu" ? (
                <Select
                  value={level}
                  placeholder="Chọn màu"
                  style={{ width: 120 }}
                  onChange={onSelectedLevelChange}>
                  {
                    COLOR.map(color => (
                      <Option key={color}>{color}</Option>
                    ))
                  }
                </Select>
              ) : selectedScale !== "Không có" ? (
                <InputNumber 
                  min={0}
                  max={500}
                  placeholder="Nhập số"
                  onChange={onSelectedLevelChange}
                />
              ) : (
                <InputNumber 
                  min={0}
                  max={500}
                  placeholder="Nhập số"
                  disabled={true} />
              )
            }
          </Col>
        </Row>
      </Panel>
    </Collapse>
  )
}
