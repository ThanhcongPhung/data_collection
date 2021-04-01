import React from 'react';
import {Menu} from 'antd';
import {Link} from "react-router-dom";
import {MenuItem, MenuList} from "@material-ui/core";

function LeftMenu(props) {
  const MenuItemStyle = {
    display: props.display,
  }
  const MenuItemStyle1 = {
    display: props.display,
  }
  const MenuItemStyle2 = {
    display: props.display,
  }
  return (
      <>
        <MenuList>
          <MenuItem style={MenuItemStyle}>
            <Link to="/" className="left-menu">Trang chủ</Link>
          </MenuItem>
          <MenuItem style={MenuItemStyle1}>
            <Link to="/audioImport" className="left-menu">Tập dữ liệu</Link>
          </MenuItem>
          <MenuItem style={MenuItemStyle2}>
            <Link to="/validateData" className="left-menu">Xác thực</Link>
          </MenuItem>
        </MenuList>
      </>
      // <Menu mode={props.mode}>
      //   <Menu.Item key="mail">
      //     <Link to="/" className="left-menu">Trang chủ</Link>
      //   </Menu.Item>
      //   <Menu.Item key="dataset">
      //     <Link to="/audioImport" className="left-menu">Tập dữ liệu</Link>
      //   </Menu.Item>
      //   <Menu.Item key="validate">
      //     <Link to="/validateData" className="left-menu">Xác thực</Link>
      //   </Menu.Item>
      // </Menu>
  )
}

export default LeftMenu
