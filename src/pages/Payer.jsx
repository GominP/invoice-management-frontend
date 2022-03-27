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
} from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { experimentalStyled as styled } from "@mui/material/styles";
import ResponsiveHeader from "../component/ResponsiveHeader";
import { useNavigate } from "react-router-dom";
import img from "../asset/images/contemplative-reptile.jpg";
import { useEffect, useState } from "react";
import { getRole, getUserID } from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import * as billerService from "../services/billerServices";
import * as payerService from "../services/payerService";
import NotFoundUser from "../component/NotFoundUser";

const url = "http://localhost:8080/";

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
  const [textHeader, setTextHeader] = useState("All Payer");
  const [rows, setRows] = useState([{}]);

  useEffect(() => {
    if (role === "payer") {
      setTextHeader("All Biller");
    }
    callApi();
  }, []);

  const callApi = () => {
    if (role === "payer") {
      billerService.biller_inquiry({ payerId: id }).then(function (response) {
        setRows(response);
      });
    } else if (role === "biller") {
      payerService.payer_inquiry({ billerId: id }).then(function (response) {
        setRows(response);
      });
    }
  };

  return (
    <div>
      <Box sx={{ px: 5 }}>
        {rows.length === 0 ? (
          <NotFoundUser></NotFoundUser>
        ) : (
          <Grid
            container
            spacing={{ xs: 2, md: 6 }}
            columns={{ xs: 2, sm: 8, md: 12, xl: 20 }}>
            {rows.map((info, index) => (
              <Grid item xs={2} sm={4} md={4} xl={4} key={index}>
                <ResponsiveHeader text={textHeader}></ResponsiveHeader>

                <Card className={classes.card}>
                  <CardActionArea onClick={() => navigate("/detailUser/1")}>
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
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => navigate("/detailUser/" + info.id)}>
                      Datail
                    </Button>
                    {role === "payer" ? null : (
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => navigate("/payer/bill/" + info.id)}>
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
