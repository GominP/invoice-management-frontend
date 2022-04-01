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

const CardWrapper = styled(MainCard)(({ theme }) => ({
  overflow: "hidden",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.secondary.dark} -50.94%, rgba(142, 202, 41, 0) 83.49%)`,
    borderRadius: "50%",
    top: -30,
    right: -180,
  },
  "&:before": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.secondary.dark} -14.02%, rgba(71, 0, 249, 0) 70.50%)`,
    borderRadius: "50%",
    top: -160,
    right: -130,
  },
}));

const CardTotal = ({ text, amount }) => {
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
CardTotal.propTypes = {
  text: PropTypes.string,
  amount: PropTypes.number,
};

export default CardTotal;
