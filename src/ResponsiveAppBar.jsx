import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import Badge from "@mui/material/Badge";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Logout from "@mui/icons-material/Logout";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { red } from "@mui/material/colors";
import Stack from '@mui/material/Stack';

// import { pink } from "@mui/material/colors";

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
const notification = [
  "ผู้วางบิล โกมินทร์ ปะวันเตา ได้สร้างบิลใหม่ Bl603015964 แล้ว",
  "ผู้วางบิล โกมินทร์ ปะวันเตา ได้สร้างบิลใหม่ Bl603015963 แล้ว",
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
    <AppBar
      style={{ backgroundColor: "#FFA234", color: "black" }}
      position="static"
    >
      <Container maxWidth="l">
        <Toolbar disableGutters sx={{ color: "black" }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 1, display: { xs: "none", md: "flex" } }}
          >
            BILLGUARD
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => changePage(page)}
                sx={{ my: 2, color: "black", display: "block"}}
              >
                {page}
              </Button>
            ))}
            
          </Box>

          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <IconButton
              onClick={handleOpenNotiMenu}
              sx={{ p: 1 }}
              aria-label={notificationsLabel(notifyCount)}
            >
              <Badge badgeContent={notifyCount} color="error">
                <NotificationsOutlinedIcon sx={{ fontSize: 25 }} />
              </Badge>
            </IconButton>
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
              onClose={handleCloseNotiMenu}
            >
              {notification.map((noti) => (
                <MenuItem key={noti} onClick={handleCloseNotiMenu} >
                  <Stack direction="row" spacing={2}>
                    <ReceiptOutlinedIcon/>
                    <Typography textAlign="left"  noWrap sx={{ display: "inline-block", whiteSpace: "pre-line"}} width={200}>{noti}</Typography>
                  </Stack>
                </MenuItem>
              ))}
            </Menu>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 52, height: 52 }}>M</Avatar>
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
            <MenuItem sx={{ color: red[500] }}>
              <ListItemIcon >
                <Logout fontSize="small" sx={{ color: red[500] }} />
              </ListItemIcon>
              ลงชื่อออก
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
