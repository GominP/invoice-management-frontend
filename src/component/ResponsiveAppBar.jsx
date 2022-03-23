import * as React from "react";
import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import { Tooltip, Stack, Badge } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { red } from "@mui/material/colors";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useNavigate, useLocation } from "react-router-dom";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";

const pages = [
  "INVOICE GUARD",
  "ดูใบแจ้งหนี้ทั้งหมด",
  "ดูผู้จ่ายใบแจ้งหนี้ทั้งหมด",
  "ยอดรวมรายรับ",
];
const pages2 = [
  "INVOICE GUARD",
  "ดูใบแจ้งหนี้ทั้งหมด",
  "ดูผู้สร้างใบแจ้งหนี้",
  "เพิ่มผู้สร้างใบแจ้งหนี้",
  "ยอดรวมรายจ่าย",
];
const notification = [
  "ผู้วางบิล โกมินทร์ ปะวันเตา ได้สร้างบิลใหม่ Bl603015964 แล้ว",
  "ผู้วางบิล โกมินทร์ ปะวันเตา ได้สร้างบิลใหม่ Bl603015963 แล้ว",
  "ยอดรวมรายรับ",
];

const ResponsiveAppBar = () => {
  let navigate = useNavigate();
  let path = useLocation();

  useEffect(() => {
    currentTab();
  }, []);

  const [anchorElNav, setAnchorElNav] = useState(null);
  // const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElNoti, setAnchorElNoti] = useState(null);
  const [notifyCount, setNotifyCount] = useState(2);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  const handleOpenNotiMenu = (event) => {
    setNotifyCount(0);
    setAnchorElNoti(event.currentTarget);
  };
  const handleCloseNotiMenu = () => {
    setAnchorElNoti(null);
  };
  function notificationsLabel(count) {
    if (count === 0) {
      return "no notifications";
    }
    if (count > 99) {
      return "more than 99 notifications";
    }
    return `${count} notifications`;
  }

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [tab, setTab] = React.useState(0);

  const currentTab = () => {
    let a = 0;
    if (path.pathname === "/") {
    } else if (path.pathname.includes("/allbill")) {
    } else if (path.pathname === "/payer") {
      a = 1;
    } else if (path.pathname === "/allget") {
      a = 2;
    }
    setTab(a);
  };

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setTab(newValue);
  };

  function changePage(page) {
    switch (page) {
      case "ดูใบแจ้งหนี้ทั้งหมด":
        navigate("/allbill");
        break;
      case "ดูผู้จ่ายใบแจ้งหนี้ทั้งหมด" || "ดูผู้สร้างใบแจ้งหนี้":
        navigate("/payer");
        break;
      case "ยอดรวมรายรับ" || "ยอดรวมรายจ่าย":
        navigate("/allget");
        break;
      case "INVOICE GUARD":
        navigate("/landing");
        break;
      case "เพิ่มผู้สร้างใบแจ้งหนี้":
        navigate("/addInvoice");
        break;
      default:
        navigate("/");
    }
    setAnchorElNav(null);

    // setMenu(event.target.innerText);
    console.log(page);
  }

  const handleLogout =()=> {
    localStorage.removeItem('token')
    navigate("/login");

  }

  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: "white",
        color: "black",
        boxShadow: "0px 0px 0px 0px",
      }}>
      {/* <Container maxWidth="xl"> */}
      <Toolbar disableGutters sx={{ p: 3 }}>
        {/* <Typography onClick={() => navigate("/landing")}
          variant="h6"
          noWrap
          component="div"
          sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
          INVOICE GUARD
        </Typography> */}

        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit">
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}>
            {pages.map((page) => (
              <MenuItem key={page} onClick={() => changePage(page)}>
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
            <MenuItem
              aria-label={notificationsLabel(notifyCount)}
              onClick={handleOpenNotiMenu}>
              <Badge badgeContent={notifyCount} color="error">
                <Typography textAlign="center">
                  การแจ้งเตือนของวันนี้
                </Typography>
              </Badge>
            </MenuItem>
          </Menu>
        </Box>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          INVOICE GUARD
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          <Tabs
            value={tab}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example">
            {pages.map((page, index) => (
              <Tab
                value={index}
                label={page}
                onClick={() => changePage(page)}
                sx={{ my: 2, color: "black", display: "block", fontSize: 20 }}>
                {page}
              </Tab>
            ))}

            <Menu
              sx={{ mt: "45px", width: 320 }}
              id="menu-appbar"
              anchorEl={anchorElNoti}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNoti)}
              onClose={handleCloseNotiMenu}>
              {notification.map((noti) => (
                <MenuItem key={noti} onClick={handleCloseNotiMenu}>
                  <Stack direction="row" spacing={2}>
                    <ReceiptOutlinedIcon />
                    <Typography
                      textAlign="left"
                      noWrap
                      sx={{ display: "inline-block", whiteSpace: "pre-line" }}
                      width={200}>
                      {noti}
                    </Typography>
                  </Stack>
                </MenuItem>
              ))}
            </Menu>
          </Tabs>
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <IconButton
            onClick={handleOpenNotiMenu}
            sx={{ p: 1 }}
            aria-label={notificationsLabel(notifyCount)}>
            <Badge badgeContent={notifyCount} color="error">
              <NotificationsOutlinedIcon sx={{ fontSize: 30 }} />
            </Badge>
          </IconButton>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}>
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
          <MenuItem
            onClick={() => {
              navigate("/editprofile/biller");
            }}>
            <Avatar /> Profile
          </MenuItem>
          <MenuItem>
            <Avatar /> My account
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/login");
            }}>
            <Avatar /> Login
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/register");
            }}>
            <Avatar /> Register
          </MenuItem>
          <Divider />
          <MenuItem sx={{ color: "red" }} onClick={() => handleLogout()}>
            <ListItemIcon>
              <Logout fontSize="small" color="error" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
export default ResponsiveAppBar;
