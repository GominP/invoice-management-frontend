import React from "react";
import MainCard from "../MainCard";
import PropTypes from "prop-types";

import { useTheme, styled } from "@mui/material/styles";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import StorefrontTwoToneIcon from "@mui/icons-material/StorefrontTwoTone";
import { blue } from "@mui/material/colors";

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: "#2979ff",
  color: "white",
  overflow: "hidden",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: `linear-gradient(90deg, rgba(223,250,162,0.30575980392156865) 10%, rgba(247,243,243,1) 71%)`,
    borderRadius: "50%",
    top: -30,
    right: -180,
  },
  "&:before": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: `linear-gradient(90deg, rgba(223,250,162,0.30575980392156865) 10%, rgba(247,243,243,1) 71%)`,
    borderRadius: "50%",
    top: -160,
    right: -130,
  },
}));

const CardTotal3 = ({ text, amount }) => {
  const theme = useTheme();

  function currencyFormat(num) {
    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div>
      <CardWrapper border={false} content={false}>
        <Box sx={{ p: 1 }}>
          <List sx={{ py: 0 }}>
            <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
              <ListItemAvatar>
                <Avatar
                  variant="rounded"
                  sx={{
                    ...theme.typography.commonAvatar,
                    ...theme.typography.largeAvatar,
                    backgroundColor: theme.palette.warning.light,
                    color: theme.palette.warning.dark,
                  }}>
                  <StorefrontTwoToneIcon fontSize="inherit" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                sx={{
                  py: 0,
                  mt: 0.45,
                  mb: 0.45,
                }}
                primary={
                  <Typography variant="h4">
                     {currencyFormat(amount)} Baht
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="h6"
                    sx={{
                      // color: theme.palette.grey[500],
                      mt: 0.5,
                    }}>
                    {text}
                  </Typography>
                }
              />
            </ListItem>
          </List>
        </Box>
      </CardWrapper>
    </div>
  );
};
CardTotal3.propTypes = {
  text: PropTypes.string,
  amount: PropTypes.number,
};

export default CardTotal3;
