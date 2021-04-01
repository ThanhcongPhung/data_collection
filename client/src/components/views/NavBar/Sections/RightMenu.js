/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {Menu, Avatar} from 'antd';
import axios from 'axios';
import {USER_SERVER} from '../../../Config';
import {withRouter, Link} from 'react-router-dom';
import {useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import {ClickAwayListener, Grow, MenuItem, MenuList, Popper, Paper} from '@material-ui/core';

import {List, ListItem, ListItemText} from "@material-ui/core";
import Button from '@material-ui/core/Button';
// import Menu from '@material-ui/core/Menu';

// const SubMenu = Menu.SubMenu;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

function RightMenu(props) {
  const user = useSelector(state => state.user)
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);


  const MenuItemStyle = {
    display: props.display,
  }
  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  if (user.userData && !user.userData.isAuth) {
    return (

        <>
          <MenuList>
            <MenuItem style={MenuItemStyle}>
              <Link to="/login">Đăng nhập</Link>
            </MenuItem>
            <MenuItem style={MenuItemStyle}>
              <Link to="/register">Đăng ký</Link>
            </MenuItem>
          </MenuList>
        </>
    )
  } else {
    return (
        <>
          <MenuList>
            <div>
              <Button
                  ref={anchorRef}
                  aria-controls={open ? 'menu-list-grow' : undefined}
                  aria-haspopup="true"
                  className="avatar"
                  onClick={handleToggle}>
                <div className="user-menu">
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
                </div>
              </Button>
              <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({TransitionProps, placement}) => (
                    <Grow
                        {...TransitionProps}
                        style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                            <MenuItem key="logout"><a onClick={logoutHandler}>Đăng xuất</a></MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                )}
              </Popper>
            </div>
          </MenuList>
        </>

        // <Menu mode={props.mode}>
        //   <SubMenu title={
        //     <div className="user-menu">
        //       <button className="avatar">
        //         <div className="avatar-user">
        //           <div className="avatar-wrap">
        //             <img className="mars-avatar"
        //                  src={user.userData && user.userData.image}
        //                  alt={user.userData && user.userData.name}
        //             />
        //           </div>
        //           <span className="name-user" title={user.userData && user.userData.name}>
        //             {user.userData && user.userData.name}
        //           </span>
        //         </div>
        //       </button>
        //     </div>}>
        //     <Menu.Item key="logout"><a onClick={logoutHandler}>Đăng xuất</a></Menu.Item>
        //   </SubMenu>
        // </Menu>
    )
  }
}

export default withRouter(RightMenu);

