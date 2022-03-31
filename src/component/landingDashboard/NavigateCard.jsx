import React from "react";
import PropTypes from "prop-types";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
// import img1 from "../../asset/images/bill.png";
import { useNavigate, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: 4,
    background: "#fff",
    boxShadow: " 0 6px 10px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.05)",
    transition:
      "0.3s transform cubic-bezier(0.155, 1.105, 0.295, 1.12),0.3s box-shadow,0.3s -webkit-transform cubic-bezier(0.155, 1.105, 0.295, 1.12)",
    padding: "14px 80px 18px 36px",
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow:
        "0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06)",
    },
  },
  img: {
    // position: "absolute",
    // top: 4,
    // right: 40,
    // maxHeight: 220,
    // maxWidth: 200,
  },
  form: {
    width: 600,
    [theme.breakpoints.down("sm")]: {
      width: 250,
    },
  },
}));
export default function NavigateCard(props) {
  const { headText, img, detail, handleNavigate } = props;
  const classes = useStyles();
  const theme = useTheme();
  let navigate = useNavigate();

  function changePage() {
    switch (handleNavigate) {
      case "/allbill":
        // navigate("/allbill");
        window.location.href = "/allbill";

        break;
      case "/payer":
        // navigate("/payer");
        window.location.href = "/payer";
        break;

      default:
        window.location.href = "/";
    }

    // setMenu(event.target.innerText);
  }

  return (
    <div>
      <Card
        sx={{ display: "flex", justifyContent: "space-between" }}
        className={classes.card}
        onClick={changePage}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent>
            <Typography component="div" variant="h5">
              {headText}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div">
              {detail}
            </Typography>
          </CardContent>
        </Box>
        <CardMedia
          className={classes.img}
          component="img"
          sx={{
            width: 290,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right",
          }}
          image={img}
          alt="Live from space album cover"
        />
      </Card>
    </div>
  );
}
NavigateCard.propTypes = {
  headText: PropTypes.string.isRequired,
  img: PropTypes.string,
  detail: PropTypes.string,
  handleNavigate: PropTypes.string.isRequired,
};
