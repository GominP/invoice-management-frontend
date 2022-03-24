import PropTypes from "prop-types";
import { useState } from "react";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Grid,
  Menu,
  MenuItem,
  Typography,
  Badge,
} from "@mui/material";
import { green, pink, indigo, blue, red } from "@mui/material/colors";

// project imports
import MainCard from "../MainCard";
// import SkeletonEarningCard from "ui-component/cards/Skeleton/EarningCard";

// assets
// import EarningIcon from "asset/images/earning.svg";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import GetAppTwoToneIcon from "@mui/icons-material/GetAppOutlined";
import FileCopyTwoToneIcon from "@mui/icons-material/FileCopyOutlined";
import PictureAsPdfTwoToneIcon from "@mui/icons-material/PictureAsPdfOutlined";
import ArchiveTwoToneIcon from "@mui/icons-material/ArchiveOutlined";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: blue[800],
  color: "#fff",
  overflow: "hidden",
  position: "relative",
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const NotiCard = ({ isLoading }) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const [name, setname] = useState("สินชัย มั่นคง");
  const [unred, setunred] = useState(4)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <CardWrapper border={false} content={false} >
        <Box sx={{ p: 2.5 }} >
          <Grid container direction="column">
            <Grid item>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Avatar
                    variant="rounded"
                    sx={{
                      bgcolor: indigo[500],
                      mt: 1,
                    }}>
                    <Badge badgeContent={4} color="primary">
                      <NotificationsNoneOutlinedIcon color="action"  />
                    </Badge>
                  </Avatar>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography
                    sx={{
                      fontSize: "2.125rem",
                      fontWeight: 500,
                      mr: 1,
                      mt: 1.75,
                      mb: 0.75,
                    }}>
                    การแจ้งเตือนของวันนี้ {unred} ข้อความ
                  </Typography>
                </Grid>
                <Grid item>
                  {/* <Avatar
                    sx={{
                      cursor: "pointer",
                      ...theme.typography.smallAvatar,
                      backgroundColor: blue[50],
                      color: theme.palette.secondary.dark,
                    }}>
                    <ArrowUpwardIcon
                      fontSize="inherit"
                      sx={{ transform: "rotate3d(1, 1, 1, 45deg)" }}
                    />
                  </Avatar> */}
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid item sx={{ mb: 1.25 }}>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: theme.palette.secondary[200],
                }}>
                ขอให้เป็นวันที่ดีนะครับ
              </Typography>
            </Grid> */}
          </Grid>
        </Box>
      </CardWrapper>
    </>
  );
};

NotiCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default NotiCard;
