import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button, Icon } from 'antd';
import './Sections/Navbar.css';
import {
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Container
} from "@material-ui/core";
import { Home } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
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
  { title: `Trang chủ`, path: `/` },
  { title: `Tập dữ liệu`, path: `/audioImport` },
  { title: `Xác thực`, path: `/validateData` },

];
function NavBar() {
  const [visible, setVisible] = useState(false)
  const classes = useStyles();

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
      // <AppBar position="static">
      //   <Toolbar>
      //     <Container maxWidth="md" className={classes.navbarDisplayFlex}>
      //       <IconButton edge="start" color="inherit" aria-label="home">
      //         <Home fontSize="large" />
      //       </IconButton>
      //       <List
      //           component="nav"
      //           aria-labelledby="main navigation"
      //           className={classes.navDisplayFlex}
      //       >
      //         {navLinks.map(({ title, path }) => (
      //             <a href={path} key={title} className={classes.linkText}>
      //               <ListItem button>
      //                 <ListItemText primary={title} />
      //               </ListItem>
      //             </a>
      //         ))}
      //       </List>
      //       <RightMenu mode="horizontal" />
      //
      //       {/*<div className="menu_rigth">*/}
      //       {/*     </div>*/}
      //     </Container>
      //   </Toolbar>
      // </AppBar>
    <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
      <div className="menu__logo">
        <Link to="/">ASR</Link>
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div>
        <div className="menu_rigth">
          <RightMenu mode="horizontal" />
        </div>
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <Icon type="align-right" />
        </Button>
        <Drawer
          title="ASR"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <RightMenu mode="inline" />
          <LeftMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  )
}

export default NavBar
