import PropTypes from "prop-types";
import { useState } from "react";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from "@mui/material";
import { green, pink, indigo, blue } from "@mui/material/colors";

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

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: blue[400],
  color: "#fff",
  overflow: "hidden",
  position: "relative",
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const WelcomeCard = ({ isLoading, name }) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  // const [name, setname] = useState("สินชัย มั่นคง")

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <CardWrapper border={false} content={false}>
      <MenuItem> 
        <Box sx={{ p: 3.5 }}>
          <Grid container direction="column">
            <Grid item>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      fontWeight: 500,
                      color: theme.palette.secondary[200],
                    }}>
                    Welcome
                  </Typography>
                  {/* <Avatar
                    variant="rounded"
                    sx={{
                      bgcolor: indigo[500],
                      mt: 1,
                    }}>
                    <AttachMoneyIcon/>
                  </Avatar> */}
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
                    {name} {}
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
            <Grid item sx={{ mb: 1.25 }}>
              {/* <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: theme.palette.secondary[200],
                }}>
                ขอให้เป็นวันที่ดีนะครับ
              </Typography> */}
            </Grid>
          </Grid>
        </Box>
        </MenuItem>
      </CardWrapper>
    </>
  );
};

WelcomeCard.propTypes = {
  isLoading: PropTypes.bool,
  name: PropTypes.string,
};

export default WelcomeCard;
