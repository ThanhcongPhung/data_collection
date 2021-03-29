/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {Menu, Avatar} from 'antd';
import axios from 'axios';
import {USER_SERVER} from '../../../Config';
import {withRouter, Link} from 'react-router-dom';
import {useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import {List, ListItem, ListItemText} from "@material-ui/core";
import Button from '@material-ui/core/Button';
// import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const SubMenu = Menu.SubMenu;
const useStyles = makeStyles({
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`
  }
});
const navLinks = [
  {title: `Đăng nhập`, path: `/login`},
  {title: `Đăng kí`, path: `/register`},

];

function RightMenu(props) {
  const user = useSelector(state => state.user)
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
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
        // <List
        //     component="nav"
        //     aria-labelledby="main navigation"
        //     className={classes.navDisplayFlex}
        // >
        //   {navLinks.map(({title, path}) => (
        //       <a href={path} key={title} className={classes.linkText}>
        //         <ListItem button>
        //           <ListItemText primary={title}/>
        //         </ListItem>
        //       </a>
        //   ))}
        // </List>
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
        // <div>
        //   {/*<Button>*/}
        //     {/*<div className="user-menu">*/}
        //     <Button className="avatar" onClick={handleClick}>
        //       <div className="avatar-user">
        //         <div className="avatar-wrap">
        //           <img className="mars-avatar"
        //                src={user.userData && user.userData.image}
        //                alt={user.userData && user.userData.name}
        //           />
        //         </div>
        //         <span className="name-user" title={user.userData && user.userData.name}>
        //                 {user.userData && user.userData.name}
        //               </span>
        //       </div>
        //     </Button>
        //   {/*</div>*/}
        // {/*</Button>*/}
        //
        //   <Menu
        //       id="simple-menu"
        //       anchorEl={anchorEl}
        //       keepMounted
        //       open={Boolean(anchorEl)}
        //       onClose={handleClose}
        //   >
        //     <MenuItem><a onClick={logoutHandler}>Đăng xuất</a></MenuItem>
        //   </Menu>
        // </div>

        <Menu mode={props.mode}>
          <SubMenu title={
            <div className="user-menu">
              <button className="avatar">
                <div className="avatar-user">
                  <div className="avatar-wrap">
                    <img className="mars-avatar"
                         src={user.userData && user.userData.image}
                         alt={user.userData && user.userData.name}
                    />
                  </div>
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

