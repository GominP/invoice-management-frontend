import {
  Box,
  Typography,
  Paper,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid,
  FormControlLabel,
  Switch,
  Stack,
} from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { experimentalStyled as styled } from "@mui/material/styles";
import ResponsiveHeader from "../component/ResponsiveHeader";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { getRole, getUserID } from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import * as billerService from "../services/billerServices";
import * as payerService from "../services/payerService";
import NotFoundUser from "../component/NotFoundUser";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#E74C3C",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#65C466" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: 10,
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "space-between",

    maxWidth: 345,
    [theme.breakpoints.down("sm")]: {
      maxWidth: 300,
    },
    [theme.breakpoints.up("xl")]: {
      maxWidth: 400,
    },
  },
  media: {
    // height: 140,
    // [theme.breakpoints.down("sm")]: {
    //     height: 70,
    //   },
  },
}));

const Payer = () => {
  let navigate = useNavigate();
  const classes = useStyles();
  const theme = useTheme();
  const role = useSelector(getRole);
  const id = useSelector(getUserID);
  const dispatch = useDispatch();
  const [textHeader, setTextHeader] = useState("All Payers");
  const [rows, setRows] = useState([{}]);
  const [isActive, setisActive] = useState(false);

  useEffect(() => {
    if (role === "payer") {
      setTextHeader("All Creditors");
    }
    callApi();
  }, []);

  const callApi = async () => {
    let arr = [];
    if (role === "payer") {
      await billerService
        .biller_inquiry({ payerId: id })
        .then(function (response) {
          response.map((item) => {
            if (item.status === "active") {
              arr.push(item);
            }
          });
          console.log(arr);
          setRows(arr);
        });
    } else if (role === "biller") {
      await payerService
        .payer_inquiry({ billerId: id })
        .then(function (response) {
          response.map((item) => {
            if (item.status === "active") {
              arr.push(item);
            }
          });
          console.log(arr);
          setRows(arr);
        });
    }
  };
  const handleActive = async () => {
    setisActive(!isActive);
    let check = "";
    let arr = [];
    if (isActive === false) {
      console.log("Inactive Mode");
      check = "inactive";
    } else {
      console.log("Active Mode");
      check = "active";
    }
    console.log(check);

    if (role === "payer") {
      await billerService
        .biller_inquiry({ payerId: id })
        .then(function (response) {
          response.map((item) => {
            if (item.status === check) {
              arr.push(item);
            }
          });
          console.log(arr);
          setRows(arr);
        });
    } else {
      await payerService
        .payer_inquiry({ billerId: id })
        .then(function (response) {
          response.map((item) => {
            if (item.status === check) {
              arr.push(item);
            }
          });
          console.log(arr);
          setRows(arr);
        });
    }
  };

  return (
    <div>
      <Box sx={{ px: 5 }}>
        <Stack direction={"row"} justifyContent="space-between">
          <Typography
            variant="h4"
            component="h1"
            p={4}
            sx={{ display: "flex", justifyContent: "center" }}>
            {textHeader}
          </Typography>

          <FormControlLabel
            value={isActive === false ? false : true}
            // defaultValue={isActive}
            control={
              <IOSSwitch sx={{ m: 1 }} defaultValue onChange={handleActive} />
            }
            label={isActive === true ? "Inactive" : "Active"}
          />
        </Stack>
        <Stack direction={"row"} spacing={3}></Stack>

        {rows.length === 0 ? (
          <NotFoundUser></NotFoundUser>
        ) : (
          <Grid
            container
            spacing={{ xs: 2, md: 6 }}
            columns={{ xs: 2, sm: 8, md: 12, xl: 20 }}>
            {rows.map((info, index) => (
              <Grid item xs={2} sm={4} md={4} xl={4} key={index}>
                {/* <ResponsiveHeader text={textHeader}></ResponsiveHeader> */}

                <Card className={classes.card}>
                  <CardActionArea
                    onClick={() =>
                      navigate("/detailUser/" + info.id + "/" + info.status)
                    }>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {info.name} {info.lastname}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p">
                        Phone number : {info.phone}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions
                    sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() =>
                        navigate("/detailUser/" + info.id + "/" + info.status)
                      }>
                      Datail
                    </Button>
                    {role === "payer" || info.status === "inactive" ? null : (
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => navigate("/payer/bill/" + info.id)}>
                        {/* <AddOutlinedIcon fontSize="70"/> */}
                        Create Invoice
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </div>
  );
};

export default Payer;
