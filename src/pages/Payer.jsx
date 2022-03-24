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
import { getUsers } from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import * as billerService from "../services/billerServices";

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
  const role = useSelector(getUsers);
  const id = useSelector((state) => state.users.userid);
  const dispatch = useDispatch();
  const [textHeader, setTextHeader] = useState("ผู้จ่ายใบแจ้งหนีัทั้งหมด");
  const [rows, setRows] = useState([{}]);

  useEffect(() => {
    if (role === "payer") {
      setTextHeader("ผู้ออกใบแจ้งหนีัทั้งหมด");
    }
    // billerService.biller_inquiry()
    axios
      .post(
        url + "biller-inquiry",
        { payerId: id },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then(function (response) {
        console.log(response.data)
        if (role === "payer") {
          // response.data["billers"].map((index) => (
          //   console.log(index)
          // ))

          setRows(response.data["billers"]);
        } else {
          console.log("fasle");
        }
        // console.log(response.data);
        // setOpenSuccess(true);
      });
  }, []);

  return (
    <div>
      <ResponsiveHeader text={textHeader}></ResponsiveHeader>
      <Box sx={{ px: 5 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 6 }}
          columns={{ xs: 2, sm: 8, md: 12, xl: 20 }}>
          {rows.map((info, index) => (
            <Grid item xs={2} sm={4} md={4} xl={4} key={index}>
              <Card className={classes.card}>
                <CardActionArea onClick={() => navigate("/detailUser/1")}>
                  {/* <CardMedia
                    className={classes.media}
                    title="Contemplative Reptile"
                    component="img"
                    height="140"
                    image={img}
                    alt="green iguana"
                  /> */}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {info.name} {info.lastname}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p">
                      เบอร์โทรศัพท์ {info.phone}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => navigate("/detailUser/" + info.id)}>
                    รายละเอียด
                  </Button>
                  {role === "payer" ? null : (
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => navigate("bill")}>
                      สร้างใบแจ้งหนี้
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Payer;
