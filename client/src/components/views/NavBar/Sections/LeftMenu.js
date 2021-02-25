import React from 'react';
import {Menu} from 'antd';
import {Link} from "react-router-dom";

function LeftMenu(props) {
  return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <Link to="/" className="left-menu">Home</Link>
        </Menu.Item>
        <Menu.Item key="dataset">
          <Link to="/audioImport" className="left-menu">Contribute</Link>
        </Menu.Item>
      </Menu>
  )
}

export default LeftMenu
