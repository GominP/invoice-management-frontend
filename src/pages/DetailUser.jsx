import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Grid,
  CardHeader,
  CardActionArea,
  Button,
  CardActions,
} from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import img2 from "../asset/images/Cat03.jpg";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@mui/styles";
import ResponsiveHeader from "../component/ResponsiveHeader";
import { useEffect, useState } from "react";
import ResponsiveDialog from "../component/ResponsiveDialog";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getUsers } from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    maxWidth: 800,
    [theme.breakpoints.down("md")]: {
      maxWidth: 600,
    },
  },
  media: {
    height: 300,
  },
}));

export default function DetailUser() {
  const theme = useTheme();
  const classes = useStyles();
  let params = useParams();
  const role = useSelector(getUsers);
  const [textHeader, setTextHeader] = useState("ข้อมูลผู้จ่ายใบแจ้งหนี้");
  const [dataInfo, setDataInfo] = useState({})

  const data = {
    id: 1,
  };

  useEffect(() => {

    axios
      .post(
        "http://localhost:8080/biller-detail-inquiry",
        {
          id: params.id,
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then(function (response) {
        console.log(response.data);
        setDataInfo(response.data)
      });

    if (role === "payer") {
      setTextHeader("ข้อมูลผู้ออกใบแจ้งหนี้");
    }
  }, []);

  return (
    <div>
      <Box sx={{ p: 3 }}>
        <Grid container sx={{ display: "flex", justifyContent: "center" }}>
          <Card className={classes.root} variant="outlined">
            <Grid>
              <Box>
                <CardContent>
                  {/* <CardHeader title={"ข้อมูลผู้จ่ายบิล"}/> */}
                  <ResponsiveHeader text={textHeader}></ResponsiveHeader>
                  <Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <Typography>Name</Typography>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Typography>{dataInfo.name} {dataInfo.lastname}</Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography>Address :</Typography>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Typography>{dataInfo.addressDetail} {dataInfo.subDistrict}  {dataInfo.district} {dataInfo.road}  {dataInfo.province} {dataInfo.zipCode}</Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography>Phone number :</Typography>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Typography>0958654531</Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography>Tax id</Typography>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Typography>{dataInfo.taxId}</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
                <CardActions sx={{display: "flex", justifyContent:"flex-end"}}>
                  <ResponsiveDialog
                    textButton={"Cancel Invoice"}
                    deleteRelation={true}></ResponsiveDialog>
                  {/* <Button>ยกเลิกใขแจ้งหนี้</Button> */}
                </CardActions>
              </Box>
            </Grid>

            {/* <CardMedia
              component="img"
              //   sx={{ width: 151 }}
              image={img2}
              alt="Live from space album cover"
            /> */}
          </Card>
        </Grid>
      </Box>
    </div>
  );
}
