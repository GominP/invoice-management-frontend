import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { red } from "@mui/material/colors";
import { pink } from "@mui/material/colors";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#FFA234",
    // fontFamily: 'Prompt',
    fontFamily: "Sarabun",
  },
});

const pages = [
  "ดูใบแจ้งหนี้ทั้งหมด",
  "ผู้จ่ายใบแจ้งหนี้ทั้งหมด",
  "ยอดรวมรายรับ",
];
const settings = ["โปรไฟล์", "แก้ไข้ข้อมูล", "ออกจากระบบ"];
const notification = [
  "ดูใบแจ้งหนี้ทั้งหมด",
  "ผู้จ่ายใบแจ้งหนี้ทั้งหมด",
  "ยอดรวมรายรับ",
];
const ResponsiveAppBar = () => {
  const classes = useStyles();
  let navigate = useNavigate();

  const [menu, setMenu] = React.useState("");
  const [notifyCount, setNotifyCount] = React.useState(2);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElNoti, setAnchorElNoti] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    console.log("Nav");
    // setAnchorElNav(event.currentTarget.innerText);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenNotiMenu = (event) => {
    setNotifyCount(0);
    setAnchorElNoti(event.currentTarget);
  };
  const handleCloseNotiMenu = () => {
    setAnchorElNoti(null);
  };

  const handleCloseNavMenu = (event) => {};

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function changePage(page) {
    switch (page) {
      case "ดูใบแจ้งหนี้ทั้งหมด":
        navigate("allbill");
        break;
      case "ผู้จ่ายใบแจ้งหนี้ทั้งหมด":
        navigate("payer");
        break;
      case "ยอดรวมรายรับ":
        navigate("allget");
        break;
      default:
        navigate("/");
    }
    // setMenu(event.target.innerText);
    console.log(page);
  }

  function notificationsLabel(count) {
    if (count === 0) {
      return "no notifications";
    }
    if (count > 99) {
      return "more than 99 notifications";
    }
    return `${count} notifications`;
  }

  return (
    <AppBar style={{ backgroundColor: "#FFA234" }} position="static">
      <Container maxWidth="l">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 1, display: { xs: "none", md: "flex" } }}
          >
            BILLGUARD
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => changePage(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
            <IconButton
              onClick={handleOpenNotiMenu}
              sx={{ p: 1 }}
              aria-label={notificationsLabel(notifyCount)}
            >
              <Badge badgeContent={notifyCount} color="secondary">
                <NotificationsIcon sx={{ fontSize: 25 }} />
              </Badge>
            </IconButton>
            <Menu
              sx={{ mt: "45px",width: 320}}
              id="menu-appbar"
              anchorEl={anchorElNoti}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={Boolean(anchorElNoti)}
              onClose={handleCloseNotiMenu}
            >
              {notification.map((notis) => (
                <MenuItem key={notis} onClick={handleCloseNotiMenu}>
                  <Typography textAlign="center">{notis}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
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
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>Teesaza3</MenuItem>
            <MenuItem>
              <Avatar /> โปรไฟล์
            </MenuItem>
            <Divider />
            {/* <MenuItem>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem> */}
            <MenuItem>
              <ListItemIcon>
                <Logout fontSize="small" sx={{ color: red[500] }} />
              </ListItemIcon>
              ลงชื่อออก
            </MenuItem>
          </Menu>

          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
