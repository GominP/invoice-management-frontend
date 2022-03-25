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
import {
  setRole,
  setNotiCount,
  getRole,
  getNotiCount,
} from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";

const biller = ["INVOICE GUARD", "All Invoice", "Payer", "Payment"];
const payer = [
  "INVOICE GUARD",
  "All Invoice",
  "Biller",
  "Add Biller",
  "Payment",
];
const notification = [
  "ผู้วางบิล โกมินทร์ ปะวันเตา ได้สร้างบิลใหม่ Bl603015964 แล้ว",
  "ผู้วางบิล โกมินทร์ ปะวันเตา ได้สร้างบิลใหม่ Bl603015963 แล้ว",
  "ยอดรวมรายรับ",
];

const ResponsiveAppBar = () => {
  let navigate = useNavigate();
  let path = useLocation();
  const role = useSelector(getRole);
  const noti = useSelector(getNotiCount);

  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    CheckRole()
    currentTab();
  }, []);

  const CheckRole = () => {
    if (role === "biller") {
      setRows(biller);
    } else {
      setRows(payer);
    }
  };

  const [anchorElNav, setAnchorElNav] = useState(null);
  // const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElNoti, setAnchorElNoti] = useState(null);
  const [notifyCount, setNotifyCount] = useState(4);

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
    dispatch(setNotiCount(0));
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
    let tabSelect = 0;
    if (path.pathname === "/") {
    } else if (path.pathname.includes("/allbill")) {
      tabSelect = 1;
    } else if (
      path.pathname === "/payer" ||
      path.pathname.includes("/detailUser")
    ) {
      tabSelect = 2;
    } else if (path.pathname === "/addBiller") {
      tabSelect = 3;
    }

    setTab(tabSelect);
  };

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  function changePage(page) {
    switch (page) {
      case "All Invoice":
        navigate("/allbill")
        // window.location.href = "/allbill";

        break;
      case "Biller":
        navigate("/payer")
        // window.location.href = "/payer";
        break;
      case "Payer":
        navigate("/payer");
        // window.location.href = "/payer";
        break;

      case "INVOICE GUARD":
        navigate("/landing")
        // window.location.href = "/landing";

        break;
      case "Add Biller":
        navigate("/addBiller")
        // window.location.href = "/addBiller";

        break;
      default:
        window.location.href = "/";
    }
    setAnchorElNav(null);

    // setMenu(event.target.innerText);
    console.log(page);
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: "white",
        color: "black",
        boxShadow: "0px 0px 0px 0px",
      }}>
      <Toolbar disableGutters sx={{ p: 3 }}>
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
            {rows.map((page) => (
              <MenuItem key={page} onClick={() => changePage(page)}>
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
            <MenuItem
              // aria-label={notificationsLabel(notifyCount)}
              onClick={handleOpenNotiMenu}>
              <Badge badgeContent={noti} color="error">
                <Typography textAlign="center">Notification</Typography>
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
            {rows.map((page, index) => (
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
            aria-label={notificationsLabel(noti)}>
            <Badge badgeContent={noti} color="error">
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
              navigate("/editprofile/"+role);
            }}>
            <Avatar /> Profile
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
