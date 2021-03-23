import React from 'react';
import {Menu} from 'antd';
import {Link} from "react-router-dom";

function LeftMenu(props) {
  return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <Link to="/" className="left-menu">Trang chủ</Link>
        </Menu.Item>
        <Menu.Item key="dataset">
          <Link to="/audioImport" className="left-menu">Tập dữ liệu</Link>
        </Menu.Item>
        <Menu.Item key="validate">
          <Link to="/validateData" className="left-menu">Xác thực</Link>
        </Menu.Item>
      </Menu>
  )
}

export default LeftMenu
