import React, { useState, useEffect } from 'react'
import { Collapse, Select, InputNumber, Row, Col } from 'antd';

import { COLOR } from '../../../../Config';

const {Panel} = Collapse;
const {Option} = Select;

const deviceData = ['Không có', 'Quạt', 'Quạt thông gió', 'Tivi', 'Loa', 'Đèn bàn', 'Đèn trần', 'Đèn cầu thang', 'Bình nóng lạnh', 'Điều hòa', 'Lò sưởi', 'Cổng', 'Lò nướng', 'Bếp'];
const roomData = {
  'Quạt': ['Không có', 'Phòng khách', 'Phòng ăn', 'Phòng bếp', 'Phòng ngủ', 'Phòng vệ sinh', 'Phòng làm việc', 'Phòng tắm'],
  'Quạt thông gió': ['Không có', 'Phòng khách', 'Phòng ăn', 'Phòng bếp', 'Phòng ngủ', 'Phòng vệ sinh', 'Phòng làm việc', 'Phòng tắm'],
  'Tivi': ['Không có', 'Phòng khách', 'Phòng ăn', 'Phòng ngủ', 'Phòng làm việc'],
  'Loa': ['Không có', 'Phòng khách', 'Phòng ăn', 'Phòng ngủ', 'Phòng làm việc'],
  'Đèn bàn': ['Không có', 'Phòng khách', 'Phòng ngủ', 'Phòng làm việc'],
  'Đèn trần': ['Không có', 'Phòng khách', 'Phòng ăn', 'Phòng bếp', 'Phòng ngủ', 'Phòng vệ sinh', 'Phòng làm việc', 'Phòng tắm'],
  'Đèn cầu thang': ['Không có', 'Cầu thang'],
  'Bình nóng lạnh': ['Không có', 'Phòng khách', 'Phòng bếp', 'Phòng vệ sinh', 'Phòng tắm'],
  'Điều hòa': ['Không có', 'Phòng khách', 'Phòng ăn', 'Phòng bếp', 'Phòng ngủ', 'Phòng làm việc'],
  'Lò sưởi': ['Không có', 'Phòng khách', 'Phòng ăn', 'Phòng bếp', 'Phòng ngủ', 'Phòng làm việc'],
  'Cổng': ['Không có', 'Vườn', 'Garage'],
  'Lò nướng': ['Không có', 'Phòng bếp'],
  'Bếp': ['Không có', 'Phòng bếp'],
  'Không có': ['Không có', 'Phòng khách', 'Phòng ăn', 'Phòng bếp', 'Phòng ngủ', 'Phòng vệ sinh', 'Phòng làm việc', 'Phòng tắm', 'Vườn', 'Garage', 'Cầu thang']
};
const floorData = ['Không có', 'Tầng 1', 'Tầng 2', 'Tầng 3', 'Tầng 4'];
const actionData = {
  'Quạt': ['Không có', 'Bật', 'Tắt', 'Tăng', 'Giảm', 'Đặt', 'Kiểm tra'],
  'Quạt thông gió': ['Không có', 'Bật', 'Tắt', 'Kiểm tra'],
  'Tivi': ['Không có', 'Bật', 'Tắt', 'Tăng', 'Giảm', 'Đặt', 'Kiểm tra'],
  'Loa': ['Không có', 'Bật', 'Tắt', 'Tăng', 'Giảm', 'Đặt', 'Kiểm tra'],
  'Đèn bàn': ['Không có', 'Bật', 'Tắt', 'Tăng', 'Giảm', 'Đặt', 'Kiểm tra'],
  'Đèn trần': ['Không có', 'Bật', 'Tắt', 'Đặt', 'Kiểm tra'],
  'Đèn cầu thang': ['Không có', 'Bật', 'Tắt', 'Kiểm tra'],
  'Bình nóng lạnh': ['Không có', 'Bật', 'Tắt', 'Kiểm tra'],
  'Điều hòa': ['Không có', 'Bật', 'Tắt', 'Tăng', 'Giảm', 'Đặt', 'Kiểm tra'],
  'Lò sưởi': ['Không có', 'Bật', 'Tắt', 'Kiểm tra'],
  'Cổng': ['Không có', 'Mở', 'Đóng', 'Kiểm tra'],
  'Lò nướng': ['Không có', 'Bật', 'Tắt', 'Tăng', 'Giảm', 'Đặt', 'Kiểm tra'],
  'Bếp': ['Không có', 'Bật', 'Tắt', 'Tăng', 'Giảm', 'Đặt', 'Kiểm tra'],
  'Không có': ['Không có', 'Bật', 'Tắt', 'Tăng', 'Giảm', 'Đặt', 'Kiểm tra'],
};
const scaleData = {
  'Quạt': ['Không có', 'Mức'],
  'Quạt thông gió': ['Không có'],
  'Tivi': ['Không có', 'Kênh', 'Âm lượng'],
  'Loa': ['Không có', 'Âm lượng'],
  'Đèn bàn': ['Không có', 'Độ sáng'],
  'Đèn trần': ['Không có', 'Màu'],
  'Đèn cầu thang': ['Không có'],
  'Bình nóng lạnh': ['Không có'],
  'Điều hòa': ['Không có', 'Nhiệt độ', 'Thời gian hẹn giờ'],
  'Lò sưởi': ['Không có'],
  'Cổng': ['Không có'],
  'Lò nướng': ['Không có', 'Nhiệt độ', 'Thời gian hẹn giờ'],
  'Bếp': ['Không có', 'Nhiệt độ', 'Thời gian hẹn giờ'],
  'Không có': ['Không có', 'Mức', 'Kênh', 'Âm lượng', 'Độ sáng', 'Màu', 'Nhiệt độ', 'Thời gian hẹn giờ']
};

export default function ServantDropDown(props) {

  const intent = props ? props.intent : null;

  const [ roomList, setRoomList ] = useState(roomData[deviceData[0]]);
  const [ selectedRoom, setSelectedRoom ] = useState(roomData[deviceData[0]][0]);
  
  const [ selectedFloor, setSelectedFloor ] = useState(floorData[0]);

  const [ actionList, setActionList ] = useState(actionData[deviceData[0]]);
  const [ selectedAction, setSelectedAction ] = useState(actionData[deviceData[0]][0]);

  const [ scaleList, setScaleList ] = useState(scaleData[deviceData[0]]);
  const [ selectedScale, setSelectedScale ] = useState(scaleData[deviceData[0]][0]);

  const [ level, setLevel ] = useState('')

  const handleDeviceChange = (value) => {
    // console.log(value)
    setRoomList(roomData[value]);
    setSelectedRoom(roomData[value][0]);

    setActionList(actionData[value]);
    setSelectedAction(actionData[value][0]);

    setScaleList(scaleData[value]);
    setSelectedScale(scaleData[value][0]);

    setSelectedFloor(floorData[0]);

    // console.log(`selectedScale === "Màu" ? ${selectedScale} ${selectedScale === "Màu"}`)
    if(value === "Đèn trần") {
      setLevel(COLOR[0]);
      props.setIntent({...intent, level: COLOR[0]});
    } else {
      setLevel('');
      props.setIntent({...intent, level: ''});
    }

    // props.setIntent({...intent, device: value});
    props.setIntent({...intent, 
      device: (value  === "Không có" ? null : value),
      room: (roomData[value][0] === "Không có" ? null : roomData[value][0]),
      action: (actionData[value][0] === "Không có" ? null : actionData[value][0]),
      scale: (scaleData[value][0] === "Không có" ? null : scaleData[value][0]),
      floor: (floorData[0] === "Không có" ? null : floorData[0]),
      level: null,
    });
  }

  const onSelectedRoomChange = (value) => {
    // console.log(value);
    setSelectedRoom(value);

    props.setIntent({...intent, room: (value  === "Không có" ? null : value)});
  }

  const onSelectedFloorChange = (value) => {
    var floor = value.match(/\d/g)[0];
    // console.log(value);
    setSelectedFloor(value);

    props.setIntent({...intent, floor: floor});
  }

  const onSelectedActionChange = (value) => {
    // console.log(value);
    setSelectedAction(value);

    props.setIntent({...intent, action: (value  === "Không có" ? null : value)});
  }

  const onSelectedScaleChange = (value) => {
    // console.log(value);
    setSelectedScale(value);
    if(value === "Màu" || value === "Không có") {
      setLevel(COLOR[0]);
      props.setIntent({...intent, 
        scale: (value  === "Không có" ? null : value),
        level: null,
      });
    } else {
      props.setIntent({...intent, 
        scale: (value  === "Không có" ? null : value),
      });
    }
  }

  const onSelectedLevelChange = (value) => {
    // console.log(value);
    setLevel(value);

    props.setIntent({...intent, level: ((value  === "Không có" || value === '') ? null : value)});
  }

  // const marginRight = "5px";

  return (
    <Collapse defaultActiveKey={['1']}>
      <Panel header="Thông tin nghe được trong câu nói của Client: " key="1">
        <Row>
        <Col span={5}>Thiết bị</Col>
        <Col span={5}>Phòng</Col>
        <Col span={3}>Tầng</Col>
        <Col span={3}>Hành động</Col>
        <Col span={5}></Col>
        <Col span={3}></Col>
        </Row>
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
                  value={level}
                  min={0}
                  max={500}
                  placeholder="Nhập số"
                  onChange={onSelectedLevelChange}
                />
              ) : (
                <InputNumber 
                  value={level}
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
