/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {Menu, Avatar} from 'antd';
import axios from 'axios';
import {USER_SERVER} from '../../../Config';
import {withRouter, Link} from 'react-router-dom';
import {useSelector} from "react-redux";

const SubMenu = Menu.SubMenu;

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
        <Menu mode={props.mode}>
          <Menu.Item key="mail">
            <Link to="/login">Đăng nhập</Link>
          </Menu.Item>
          <Menu.Item key="app">
            <Link to="/register">Đăng kí</Link>
          </Menu.Item>
        </Menu>
    )
  } else {
    return (
        <Menu mode={props.mode}>
          <SubMenu title={
            <div className="user-menu">
              <button className="avatar">
                <div className="avatar-user">
                  <Avatar size={44} src={user.userData && user.userData.image}/>
                  <span className="name-user" title={user.userData && user.userData.name}>
                    {user.userData && user.userData.name}
                  </span>
                </div>
              </button>
            </div>}>
            <Menu.Item key="logout"><a onClick={logoutHandler}>Đăng xuất</a></Menu.Item>
          </SubMenu>
        </Menu>
    )
  }
}

export default withRouter(RightMenu);

